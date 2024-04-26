"use client";
import { Typography } from "@mui/material";
import { useIsSafeApp } from "@/hooks/useIsSafeApp";
import WrapEth from "@/components/WrapEth";
import SafeProvider from "@safe-global/safe-apps-react-sdk";

export default function Home() {
  const isSafeApp = useIsSafeApp();

  if (!isSafeApp) {
    return <Typography>This app can only be run as a Safe App</Typography>;
  }

  return (
    <SafeProvider>
      <WrapEth />;
    </SafeProvider>
  );
}
