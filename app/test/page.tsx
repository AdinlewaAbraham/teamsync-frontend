"use client";
import { returnError } from "@/services/test";
import { test } from "node:test";
import React from "react";
import { useQuery } from "react-query";

const Page = () => {
  const { data, error, isLoading } = useQuery(
    ["document"],
    async () => await returnError(),
  );
  if (!isLoading) {
    console.log(data);
    console.log(error);
    if (error) {
    }
  }
  const getData = async () => {};
  return (
    <div>
      <button onClick={getData}>get data</button>
    </div>
  );
};

export default Page;
