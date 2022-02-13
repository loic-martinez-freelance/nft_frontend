import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Topbar from '../Components/Topbar'
import { RootState } from '../store'
import { Metadata } from '../Types/metadata'
import { getTokens } from '../Utils/etherManager'

const MyList = () => {
  const [tokens, setTokens] = useState<Metadata[]>()
  const connected = useSelector((state: RootState) => state.wallet.connected)
  const account = useSelector((state: RootState) => state.wallet.account)

  useEffect(() => {
    if (connected) {
      getTokens(account).then((ar) => {
        if (ar) setTokens(ar)
      })
    }
  }, [connected, account])

  const tokensView = tokens?.map((t) => (
    <Grid item xs={4} md={3} lg={2} key={t.name}>
      <Card>
        <CardMedia component="img" image={t.image}></CardMedia>
        <CardContent>
          <Typography variant="h5" component="div">
            {t.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))

  return (
    <>
      <Topbar />
      {tokensView && tokensView.length == 0 && (
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">
              Nothing minted in this wallet yet!
            </Typography>
            <Button>Mint!</Button>
          </Box>
        </Box>
      )}
      {tokensView && tokensView.length > 0 && (
        <Box sx={{ padding: 3 }}>
          <Box>
            <Typography variant="h6">My NFT list</Typography>
            <Divider></Divider>
          </Box>
          <Grid sx={{ mt: 1 }} container spacing={2}>
            {tokensView}
          </Grid>
        </Box>
      )}
    </>
  )
}

export default MyList