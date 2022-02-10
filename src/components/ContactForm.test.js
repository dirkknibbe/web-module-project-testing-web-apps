import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

beforeEach(() => {
  render(<ContactForm />);
});
afterEach(() => {
  document.body.innerHTML = "";
});

test("renders without errors", () => {});

test("renders the contact form header", () => {
  const header = screen.getByText("Contact Form");
  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  //   userEvent.type(firstName, "dirk");
  //   const error = screen.getByText(
  //     "Error: firstName must have at least 5 characters."
  //   );
  //   expect(error).toBeInTheDocument();

  userEvent.type(firstName, "dirk");
  const errorMessages = await screen.findAllByTestId("error");

  expect(errorMessages).toHaveLength(1);
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  const submitBtn = screen.queryByText("Submit");
  userEvent.click(submitBtn);

  const errorMessages = await screen.findAllByTestId("error");
  userEvent.click(submitBtn);

  expect(errorMessages).toHaveLength(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  const firstNameField = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameField, "dirkelton");

  const lastNameField = screen.getByLabelText(/last name/i);
  userEvent.type(lastNameField, "knibbe");

  const button = screen.getByRole("button");
  userEvent.click(button);

  const errorMessages = await screen.getAllByTestId("error");
  expect(errorMessages).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  const emailField = screen.getByLabelText(/email*/i);
  userEvent.type(emailField, "dirkknibbe@gmail");

  const errorMessage = await screen.findByText(
    /email must be a valid email address/i
  );
  expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {});

test("renders all fields text when all fields are submitted.", async () => {});
