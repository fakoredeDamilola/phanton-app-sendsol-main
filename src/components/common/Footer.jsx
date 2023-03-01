import { Box, Container, Divider, Typography, Link } from '@mui/material';

export const Footer = () => {
  return(
    <Box sx={{ mt: 8, mb: 8 }}>
    <Divider />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Link href="https://3drootkabs.io" target="_blank">
          <img src={`${process.env.PUBLIC_URL}/GitHub-Mark-32px.png`} />
        </Link>
        <Typography>by <Link href="https://3drootlabs.io" target="_blank">3d root labs</Link></Typography>
      </Container>
    </Box>
  );
}
