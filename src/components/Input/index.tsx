import css from "./styles.module.css";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState, ChangeEvent, useCallback, useEffect } from "react";

export default function InputForm({
  balance,
  isWrap,
  onWrap,
  onUnwrap,
}: {
  balance: string;
  isWrap: boolean;
  onWrap: (amount: string) => void;
  onUnwrap: (amount: string) => void;
}) {
  const [amount, setAmount] = useState("0");
  const [amountError, setAmountError] = useState<string | undefined>(undefined);

  // reset amount to zero when switching the action type
  useEffect(() => {
    setAmount(balance);
    setAmountError("");
  }, [balance, isWrap]);

  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (Number(newValue) > Number(balance)) {
      setAmountError("Amount exceeds balance");
    } else if (Number(newValue) < 0) {
      setAmountError("Amount must be greater than zero");
    } else if (isNaN(Number(newValue))) {
      setAmountError("Amount must be a number");
    } else {
      setAmountError("");
    }
    setAmount(newValue);
  };

  const onSetToMax = useCallback(() => {
    setAmount(balance);
  }, [balance]);

  const handleSubmit = () => {
    if (isWrap) {
      onWrap(amount);
    }
    onUnwrap(amount);
  };

  return (
    <>
      <Typography>
        {isWrap ? "ETH " : "WETH "} balance: {balance}
      </Typography>
      <Box display="flex">
        <TextField
          variant="outlined"
          fullWidth
          onFocus={(event) => {
            event.target.select();
          }}
          value={amount}
          onChange={onChangeAmount}
          helperText={amountError}
          error={!!amountError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  disabled={false}
                  onClick={onSetToMax}
                  sx={{
                    border: 0,
                    background: "none",
                    color: "var(--mui-palette-primary-main)",
                    padding: 0,
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Max
                </Button>
              </InputAdornment>
            ),
          }}
          sx={{ flex: 3, mr: 4 }}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          disableElevation
          sx={{ flex: 1 }}
          disabled={Number(amount) === 0}
        >
          {isWrap ? "Wrap ETH" : "Unwrap WETH"}
        </Button>
      </Box>
    </>
  );
}
