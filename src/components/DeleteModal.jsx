"use client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
const DeleteModal = ({ pet }) => {
  // console.log(pet);
  const router = useRouter();
  const [deleted, setDelete] = useState(null);

  const handleDelete = async (id) => {
    console.log(id);

    const res = await fetch(`http://localhost:5000/adopted/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    console.log(data);

    if (data.deletedCount > 0) {
      setDelete(data);
      router.push("/dashboard/my-listing");
    }
  };
  return (
    <AlertDialog>
      <Button
        className={
          "py-6 rounded-2xl cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold flex items-center justify-center gap-2 transition"
        }
        variant="solid"
      >
        <FaTrash />
        Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Adopted permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Adopted pet</strong> and
                all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(pet._id)}
                slot="close"
                variant="danger"
              >
                Delete Adopted
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteModal;
