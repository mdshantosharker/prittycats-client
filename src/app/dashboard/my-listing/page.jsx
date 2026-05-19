import ListingSection from "@/components/ListingSection";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyListing = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
//   console.log(session);
  const res = await fetch("http://localhost:5000/pets", {
    method: "GET",
  });
  const pets = await res.json();
//   const resAdopt = await fetch(
//     `http://localhost:5000/adopted/6a0c993a8a46cbb130447cc9`,
//     {
//       method: "GET",
//     },
//   );
//   console.log(pets);
//   const adopted = await resAdopt.json();
  return <ListingSection pets={pets} />;
};

export default MyListing;
