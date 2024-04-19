"use client";

import css from "./page.module.css";
import { InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { useState, ChangeEvent, useCallback } from "react";
import InputForm from "@/components/Input";

export default function Home() {
  return (
    <>
      <InputForm isWrap={true} />
      <InputForm isWrap={false} />
    </>
  );
}
