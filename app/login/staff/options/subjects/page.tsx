"use client";
import * as React from "react";
import { Button, Modal, TextField } from "@mui/material";
import { db } from "@/firebase/config";
import { onValue, ref, set } from "firebase/database";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function SubjectEdit() {
  const [subjects, setSubjects]: any[] = React.useState([]);
  const [reload, setReload] = React.useState(0);
  const [addSubjcetButtonColor, setAddSubjcetButtonColor] =
    React.useState("primary");
  // console.log(subjects)
  const router = useRouter();

  React.useEffect(() => {
    let theSubjcets: any[] = [];
    onValue(ref(db, "mhusd/requestInfo/subjects/"), (snapshot) => {
      snapshot.forEach((indivSub) => {
        theSubjcets.push({
          subject: indivSub.key,
          classes: indivSub.val().split(","),
        });
      });
    });
    setSubjects(theSubjcets);
  }, [reload]);

  React.useEffect(() => {
    setTimeout(() => {
      setReload(reload + 1);
    }, 1500);
  }, []);

  const publishChanges = () => {
    let theCurrent: any = {};
    for (let i = 0; i < subjects.length; i++) {
      theCurrent[subjects[i].subject] = subjects[i].classes.join(",");
    }
    set(ref(db, "mhusd/requestInfo/subjects/"), theCurrent);
    router.push("/login/staff/options");
  };

  const SubjectHead = ({
    value,
    index,
    array,
  }: {
    value: any;
    index: number;
    array: any[];
  }) => {
    const [currentValue, setCurrentValue] = React.useState(value.subject);
    const [textError, setTextError] = React.useState(false);
    const [modal, setModal] = React.useState(false);

    const addIndiv = () => {
      let theCurrent = subjects;
      if (theCurrent[index].classes.length != 0) {
        if (
          theCurrent[index].classes[theCurrent[index].classes.length - 1] ==
            undefined ||
          theCurrent[index].classes[theCurrent[index].classes.length - 1] ==
            null ||
          theCurrent[index].classes[theCurrent[index].classes.length - 1] == ""
        ) {
          setTextError(true);
          // alert("Please fill in the last ")
        } else {
          setTextError(false);
          theCurrent[index].classes.push("");
          setSubjects([...theCurrent]);
        }
      } else {
        setTextError(false);
        theCurrent[index].classes.push("");
        setSubjects([...theCurrent]);
      }
    };

    const deleteSubj = () => {
      let theCurrent = subjects;
      theCurrent.splice(index, 1);
      setSubjects([...theCurrent]);
    };

    return (
      <>
        <div>
          <div className="flex flex-row justify-start">
            <TextField
              error={textError}
              value={currentValue}
              onChange={(event) => setCurrentValue(event.target.value)}
              onBlur={() => {
                array[index].subject = currentValue;
                setSubjects([...array]);
              }}
            />
            <button
              onClick={addIndiv}
              className="ml-2 transition hover:scale-110 hover:-translate-y-1"
            >
              <AddIcon className="text-emerald-400" fontSize="large" />
            </button>
            <button
              onClick={() => setModal(true)}
              className="ml-1.5 transition hover:scale-110 hover:-translate-y-1"
            >
              <DeleteOutlineOutlined
                className="text-red-600"
                fontSize="large"
              />
            </button>
          </div>
          <div className="flex flex-col ml-6">
            {value.classes.map((theValue: string, theIndex: number) => (
              <IndivClasses
                value={theValue}
                index={theIndex}
                bigArray={array}
                bigIndex={index}
              />
            ))}
          </div>
        </div>
        <Modal
          className="self-center"
          onClose={() => setModal(false)}
          open={modal}
        >
          <div className="w-screen h-screen flex flex-col justify-center items-center bg-transparent">
            <div className="flex flex-col items-center py-8 gap-y-3 px-6 animate-duration-500 relative animate-jump-in ease-in h-fit w-96 bg-[#1e1e1e] rounded-2xl">
              <text className="text-4xl font-medium text-center text-slate-100">
                This action cannot be undone
              </text>
              <Button
                onClick={deleteSubj}
                className="text-3xl mt-8"
                variant="outlined"
                color="error"
              >
                Confirm
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  };

  const IndivClasses = ({
    value,
    index,
    bigArray,
    bigIndex,
  }: {
    value: string;
    index: number;
    bigArray: any[];
    bigIndex: number;
  }) => {
    const [currentValue, setCurrentValue] = React.useState(value);

    const deleteIndiv = () => {
      let theCurrent = subjects;
      theCurrent[bigIndex].classes.splice(index, 1);
      // console.log(bigArray);
      setSubjects([...theCurrent]);
    };

    return (
      <div className="flex flex-row items-end">
        <div className="flex flex-col items-start">
          <div className="w-0.5 h-16 bg-gray-700 bg-opacity-60" />
          <div className="w-14 h-0.5 bg-gray-700 bg-opacity-60" />
          <div className="w-0 h-3 bg-transparent" />
        </div>
        <TextField
          value={currentValue}
          onChange={(event) => setCurrentValue(event.target.value)}
          onBlur={() => {
            let theCurrent = subjects;
            theCurrent[bigIndex].classes[index] = currentValue;
            setSubjects([...theCurrent]);
          }}
        />
        <button
          onClick={deleteIndiv}
          className="mb-4 ml-2 scale-110 transition hover:scale-125 hover:-translate-y-1"
        >
          <DeleteOutlineOutlined className="text-red-600" fontSize="medium" />
        </button>
      </div>
    );
  };

  const addSubjcet = () => {
    console.log(subjects);
    if (
      (subjects.length != 0 &&
        subjects[subjects.length - 1].subject == undefined) ||
      subjects[subjects.length - 1].subject == null ||
      subjects[subjects.length - 1].subject == ""
    ) {
      setAddSubjcetButtonColor("error");
      alert("Name your last subject before you create another");
    } else {
      setAddSubjcetButtonColor("primary");
      let placeholder = subjects;
      placeholder.push({
        subject: "",
        classes: [],
      });
      setSubjects([...placeholder]);
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center pb-12">
      <text className="text-5xl text-slate-100 font-semibold mt-8">
        Edit Subjects
      </text>
      <div className="flex flex-col w-full h-full mt-12 items-center">
        <div className="flex flex-row w-full h-fit justify-center px-12 flex-wrap gap-y-5">
          <Button
            color={addSubjcetButtonColor}
            onClick={addSubjcet}
            variant="outlined"
            className="w-52 h-18 text-2xl"
          >
            Add Subject
          </Button>
          <Button
            onClick={() => setReload(reload + 1)}
            color="warning"
            variant="outlined"
            className="text-2xl ml-20"
          >
            Revert
          </Button>
          <Button
            onClick={publishChanges}
            color="success"
            variant="outlined"
            className="text-2xl ml-6"
          >
            Apply Changes
          </Button>
        </div>
        <div className="flex flex-row gap-y-6 gap-x-10 mt-8 flex-wrap justify-center px-12">
          {subjects.map((value: any, index: number, array: any[]) => (
            <SubjectHead value={value} index={index} array={array} />
          ))}
        </div>
      </div>
    </div>
  );
}
