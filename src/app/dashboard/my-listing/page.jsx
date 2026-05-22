import ListingSection from "@/components/ListingSection";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyListing = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  console.log(session);
  //   console.log(session);
  const res = await fetch(
    `http://localhost:5000/adopted?ownerEmail=${session?.user?.email}`,
    {
      method: "GET",
    },
  );
  const pets = await res.json();

  return <ListingSection pets={pets} />;
};

export default MyListing;
