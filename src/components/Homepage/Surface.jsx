import {
  ArrowsRotateLeft,
  Box,
  ChevronDown,
  CreditCard,
  PlanetEarth,
  Receipt,
  ShoppingBag,
} from "@gravity-ui/icons";
import { Accordion } from "@heroui/react";

const items = [
  {
    content:
      "Most adoptions are low-cost and only cover basic care and medical checkups.",
    icon: <ShoppingBag />,
    title: "Do I need to pay for adoption?",
  },
  {
    content: "Yes! We help you choose pets suitable for apartment living.",
    icon: <Receipt />,
    title: "Can I adopt if I live in an apartment?",
  },
  {
    content: "Usually 24–72 hours depending on application review.",
    icon: <CreditCard />,
    title: "How long does approval take?",
  },
  {
    content:
      "Yes, but we encourage responsible adoption and proper consultation first.",
    icon: <Box />,
    title: "Can I return a pet?",
  },
  {
    content:
      "Yes, adopters must usually be at least 18 years old. In some cases, younger adopters can apply with parental consent.",
    icon: <PlanetEarth />,
    title: "Is there an age requirement to adopt a pet?",
  },
  {
    content:
      "Yes! Most pets are fully vaccinated, dewormed, and checked by a vet before adoption to ensure they are healthy and ready for a new home.",
    icon: <ArrowsRotateLeft />,
    title: "Do the pets come vaccinated and health-checked?",
  },
];

export function Surface() {
  return (
    <div className="lg:max-w-7xl mt-10 w-11/12 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        ❓ Frequently Asked Questions
      </h2>
      <Accordion className="w-full" variant="surface">
        {items.map((item, index) => (
          <Accordion.Item key={index}>
            <Accordion.Heading>
              <Accordion.Trigger>
                {item.icon ? (
                  <span className="flex items-center size-10 shrink-0 text-muted">
                    {item.icon}
                  </span>
                ) : null}
                {item.title}
                <Accordion.Indicator>
                  <ChevronDown />
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>{item.content}</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
