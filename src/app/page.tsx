"use client";
import css from "./page.module.css";
import { InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { useState, ChangeEvent, useCallback } from "react";
import InputForm from "@/components/Input";
import { useIsSafeApp } from "@/hooks/useIsSafeApp";

export default function Home() {
  const isSafeApp = useIsSafeApp();

  if (!isSafeApp) {
    return <Typography>This app can only be run as a Safe App</Typography>;
  }

  return (
    <>
      <InputForm isWrap={true} />
      <InputForm isWrap={false} />
    </>
  );
}
