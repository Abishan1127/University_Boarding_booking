import { loadStripe } from "@stripe/stripe-js";

// Load Stripe with your public key
export const stripePromise = loadStripe("pk_test_51R1hMOEONWevZjHkphPUCUKk73mN9NpG4D7VRP9R1F2J58iFljtso3sX0BGSoy9i6Uc1c0xZXCpMbJtPm5jCFZEI002DuZzjum");