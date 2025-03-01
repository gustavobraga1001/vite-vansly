import { useContext } from "react";
import { DriverContext } from ".";

export default function useDriver() {
  const context = useContext(DriverContext);
  return context;
}