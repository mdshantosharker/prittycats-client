import ListingSection from "@/components/ListingSection";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyListing = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const userid = session?.user?.id;
  console.log(userid);
  // console.log(session);
  const res = await fetch(`http://localhost:5000/pets/user/${userid}`, {
    method: "GET",
  });
  const pets = await res.json();
  console.log(pets);

  return <ListingSection pets={pets} />;
};

export default MyListing;
