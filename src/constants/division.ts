export const BangladeshDivision = {
  DHAKA: "Dhaka",
  CHATTOGRAM: "Chattogram",
  RAJSHAHI: "Rajshahi",
  KHULNA: "Khulna",
  BARISHAL: "Barishal",
  SYLHET: "Sylhet",
  RANGPUR: "Rangpur",
  MYMENSINGH: "Mymensingh"
} as const;

export type BangladeshDivisionType =
  (typeof BangladeshDivision)[keyof typeof BangladeshDivision];

// Get Way
// const myDivision: BangladeshDivisionType = BangladeshDivision.DHAKA;
// console.log(myDivision); // Output: Dhaka