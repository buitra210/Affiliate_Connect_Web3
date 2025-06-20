import { Typography } from '@mui/material';

export default function SectionTitle({ title }: { title: string }) {
  return (
    <Typography
      variant="h2"
      className="text-gradient"
      sx={{
        whiteSpace: 'pre-line',
        textAlign: 'center',
      }}
      data-aos="fade-up"
    >
      {title}
    </Typography>
  );
}
