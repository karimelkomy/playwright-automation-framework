import { faker } from "@faker-js/faker";
import { FormDetailsInterface } from "../interfaces/FormDetailsInterface";
import { interests } from "./interests";
import { propertyTypes } from "./propertyTypes";

export function FormDetails(): FormDetailsInterface {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: faker.internet.email({ provider: "yopmail.com" }),
    phone: faker.string.numeric(10),
    zipCode: faker.location.zipCode("#####"),
    interests,
    propertyType: propertyTypes.OWNED_HOUSE,
  };
}
