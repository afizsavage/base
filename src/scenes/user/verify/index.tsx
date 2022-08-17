import {
  Box,
  CircularProgress,
  Link,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import CardLongLayout from '../../../common/components/Layouts/CardLongLayout';
import MonButton from '@monime-lab/frontend-extra/monime/MonButton';
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PinInput from '../../../common/components/PinInput';
import useCountdown from '../../../common/hooks/useCountdown';
import { useSignUpInfo } from '../../../common/components/SignUpInfoProvider';
import { formatUserAliasValue } from '../../../common/@types';

const _1minutesDelay = 60 * 1000;

const ResendCode = (props: {
  clearTimerRef: React.MutableRefObject<Function | undefined>;
}) => {
  const theme = useTheme();
  const { minutesLeft, secondsLeft, isCompleted, resetTimer, clearTimer } =
    useCountdown('VerifyCodeResend', _1minutesDelay);
  const [isRequesting, setIsRequesting] = useState(false);
  useEffect(() => {
    return (props.clearTimerRef.current = clearTimer);
  }, [props.clearTimerRef, clearTimer]);
  const handleResendCode = useCallback(() => {
    setIsRequesting(true);
    setTimeout(() => {
      setIsRequesting(false);
      resetTimer();
    }, 3000);
  }, [resetTimer]);
  return (
    <Box
      sx={{
        mt: 1.1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Link
        component={'span'}
        onClick={handleResendCode}
        sx={{
          mr: 1.1,
          fontSize: 13,
          cursor: 'pointer',
          pointerEvents: isCompleted ? 'all' : 'none',
          color:
            isRequesting || !isCompleted
              ? theme.palette.grey['500']
              : theme.palette.primary.main,
        }}
      >
        Resend Code
      </Link>
      {isRequesting || isCompleted ? null : (
        <>
          <Typography variant={'subtitle2'} sx={{ fontSize: 13 }}>
            {minutesLeft?.toString()?.padStart(2, '0')}
          </Typography>
          :
          <Typography variant={'subtitle2'} sx={{ fontSize: 13 }}>
            {secondsLeft?.toString()?.padStart(2, '0')}
          </Typography>
        </>
      )}
      {isRequesting ? <CircularProgress size={14} /> : null}
    </Box>
  );
};

export default function Verify() {
  const navigate = useNavigate();
  const clearTimerRef = useRef<Function>();
  const { signUpInfo, setSignUpInfo } = useSignUpInfo();
  const [isPinComplete, setIsPinComplete] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const handleTriggerVerification = useCallback(() => {
    setIsRequesting(true);
    setTimeout(() => {
      setIsRequesting(false);
      navigate('/create/user/profile', { replace: true });
    }, 3000);
  }, [navigate]);
  return (
    <CardLongLayout>
      <Box
        component={'form'}
        onSubmit={(e: FormEvent<any>) => {
          e.preventDefault();
        }}
      >
        <Box sx={{ p: 2, position: 'absolute', top: 0 }}>
          <MonButton
            startIcon={<ArrowBack />}
            onClick={() => {
              clearTimerRef.current?.();
              setSignUpInfo({ replace: true });
              navigate('/create/user/alias', { replace: true });
            }}
          >
            Back
          </MonButton>
        </Box>
        <Box
          component={'form'}
          sx={{
            p: 3,
          }}
        >
          <Typography variant={'h3'} component={Box} sx={{ mb: 2 }}>
            Verify your identity
          </Typography>
          <Typography variant={'body2'}>
            Enter the code sent to{' '}
            <Box
              component={'span'}
              sx={{
                fontWeight: 700,
                color: (t: Theme) => t.palette.primary.dark,
              }}
            >
              {formatUserAliasValue(signUpInfo)}
            </Box>
          </Typography>
          <Box sx={{ mt: 3 }}>
            <PinInput
              disabled={isRequesting}
              onChange={(code) => {
                setSignUpInfo({ user: { alias: { verificationCode: code } } });
                setIsPinComplete(false);
              }}
              onComplete={() => {
                setIsPinComplete(true);
                handleTriggerVerification();
              }}
            />
          </Box>
          <ResendCode clearTimerRef={clearTimerRef} />
          <Box sx={{ mt: 5 }}>
            <MonButton
              loading={isRequesting}
              disabled={!isPinComplete}
              variant={'contained'}
              sx={{ minWidth: 180 }}
              onClick={handleTriggerVerification}
            >
              {isRequesting ? 'Requesting...' : 'Continue'}
            </MonButton>
          </Box>
        </Box>
      </Box>
    </CardLongLayout>
  );
}
