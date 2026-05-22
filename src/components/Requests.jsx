"use client";

import { Button, Modal } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";

const Requests = ({ petId }) => {
  const [adopted, setAdopted] = useState([]);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:5000/adopted/${petId}`);
      const data = await res.json();
      setAdopted(data.adopted || data);
    };

    getData();
  }, [petId]);

  const updateStatus = async (id, status) => {
    const res = await fetch(`http://localhost:5000/adopted/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    setAdopted((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status } : item)),
    );
  };

  return (
    <Modal
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);

        if (!isOpen) {
          router.push("/dashboard/my-listing");
        }
      }}
    >
      <Button
        onClick={() => setOpen(true)}
        variant="solid"
        className="w-full py-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-semibold"
      >
        <FaUsers />
        Requests
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-2xl rounded-3xl border border-gray-100">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-indigo-100 text-indigo-600">
                <FaUsers className="size-5" />
              </Modal.Icon>

              <Modal.Heading className="text-2xl font-black">
                Adoption Requests 🐾
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <div className="space-y-5">
                {adopted.length > 0 ? (
                  adopted.map((request, index) => (
                    <div
                      key={index}
                      className="border border-gray-100 rounded-3xl p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-gray-500 mt-1">
                            {request.ownerEmail}
                          </p>
                          <h3 className="text-xl font-bold text-gray-900">
                            {request.userName}
                          </h3>

                          

                          <p className="mt-3 text-sm text-gray-700">
                            <span className="font-semibold">Pickup Date:</span>{" "}
                            {request.picUpDate
                              ? `${request.picUpDate.year}-${request.picUpDate.month}-${request.picUpDate.day}`
                              : "N/A"}
                          </p>
                        </div>

                        <span
                          className={`px-4 py-2 rounded-full text-xs font-bold ${
                            request.status === "approved"
                              ? "bg-emerald-100 text-emerald-600"
                              : request.status === "rejected"
                                ? "bg-red-100 text-red-600"
                                : "bg-amber-100 text-amber-600"
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>

                      {request.status === "pending" && (
                        <div className="flex gap-3 mt-6">
                          <button
                            onClick={() =>
                              updateStatus(request._id, "approved")
                            }
                            className="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(request._id, "rejected")
                            }
                            className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <FaUsers className="mx-auto text-5xl text-gray-300 mb-4" />

                    <h3 className="text-2xl font-bold text-gray-700">
                      No Requests Yet
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Nobody requested this pet yet.
                    </p>
                  </div>
                )}
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                slot="close"
                className="w-full rounded-2xl bg-black text-white font-semibold"
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default Requests;
