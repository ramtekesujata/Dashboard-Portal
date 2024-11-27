import * as React from 'react';
import { useState, useEffect } from 'react';
import { getData } from '../api/requests';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {LOGOUT_URL,DETAILS_URL,PASS_FAIL_URL,RESULTS_URL,LOCATION_LIST_URL} from '../api/urls'
import logo from '../logo.png'
import Paper from '@mui/material/Paper';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PeopleIcon from '@mui/icons-material/People';
import NearMeIcon from '@mui/icons-material/NearMe';
import Row from 'react-bootstrap/Row';
import Grid from '@mui/material/Grid';
import Col from 'react-bootstrap/Col';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as Tiptool,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tiptool,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);
const pages = ['Home','Dashboard'];
const settings = ['Logout'];

export const Dashboard = (params:any) => {
  document.title = params.title;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [details, setDetails] = useState<any>(undefined)
  const [result, setResult] = useState<any>(undefined)
  const [allResult, setAllResult] = useState<any>(undefined)
  const [list, setList] = useState<any>(undefined)
  useEffect(() => {
    if(details===undefined)
    {
      getData(DETAILS_URL,setDetails)
    }
    if(result===undefined)
    {
      getData(PASS_FAIL_URL,setResult)
    }
    if(allResult===undefined)
    {
      getData(RESULTS_URL,setAllResult)
    }
    if(list===undefined)
    {
      getData(LOCATION_LIST_URL,setList)
    }
  }, [])

  const [location, setLocation] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    if(event.target.value!==undefined)
    {
      getData(PASS_FAIL_URL+"?city="+event.target.value as string,setResult)
    }
    setLocation(event.target.value as string);
  };
  

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 3, display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ my: 1, color: 'white', display: 'block' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-error-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                value={location}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={undefined}>
                  <em>None</em>
                </MenuItem>
                {
                  list!==undefined?list.location.map((city:string)=>{
                    return <MenuItem value={city}>{city}</MenuItem> 
                  }):("")
                }
              </Select>
            </FormControl>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile name"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                return (
                setting==='Logout'?
                <MenuItem key={setting}
                onClick={() => {
                  let username=localStorage.getItem('username');
                  let password=localStorage.getItem('pswd');
                  sessionStorage.removeItem("authenticatedUser");
                  const fetchPromise = fetch(LOGOUT_URL, {
          
                    method: "POST",
                    headers: {
                      'Content-Type':'application/json'
                    },
                    body: JSON.stringify({username,password})
                  });
                  localStorage.removeItem("Token");
                  window.location.href = "/";
                }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>:<MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>)
            })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Container style={{marginTop:"2rem"}}>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 250,
          height: 250,
        },
        justifyContent:"space-around"
      }}
    >
      <Paper elevation={3} style={{backgroundColor:"#E8E4FC",padding:"1rem"}}>
        <Row style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
          <Col>
            <PeopleIcon style={{fontSize:"5rem",color:"#6353F7"}}/>
          </Col>
        </Row>
        <Row style={{display:"flex",justifyContent:"center", alignItems:"center",height:"50%"}}>
          <Col>
            <Typography mt={2} variant="h4" style={{display:"flex",justifyContent:"center",fontWeight:600}}>
              Total Students
            </Typography>
            <Typography mt={2} variant="h5" style={{display:"flex",justifyContent:"center"}}>
              {
                details!==undefined?details.count:("")
              }
            </Typography>
          </Col>
        </Row>
      </Paper>
      <Paper elevation={3} style={{backgroundColor:"#F6E4E8",padding:"1rem"}}>
      <Row style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
          <Col>
            <AutoStoriesIcon style={{fontSize:"5rem",color:"#E73C65"}}/>
          </Col>
        </Row>
        <Row style={{display:"flex",justifyContent:"center", alignItems:"center",height:"50%"}}>
          <Col>
            <Typography mt={2} variant="h4" style={{display:"flex",justifyContent:"center",fontWeight:600}}>
              Total Subjects
            </Typography>
            <Typography mt={2} variant="h5" style={{display:"flex",justifyContent:"center"}}>
              {
                details!==undefined?details.subject:("")
              }
            </Typography>
          </Col>
        </Row>
      </Paper>
      <Paper elevation={3} style={{backgroundColor:"#DEECF7",padding:"1rem"}}>
      <Row style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
          <Col>
            <NearMeIcon style={{fontSize:"5rem",color:"#1B83D0"}}/>
          </Col>
        </Row>
        <Row style={{display:"flex",justifyContent:"center", alignItems:"center",height:"50%"}}>
          <Col>
            <Typography mt={2} variant="h4" style={{display:"flex",justifyContent:"center",fontWeight:600}}>
              Locations
            </Typography>
            <Typography mt={2} variant="h5" style={{display:"flex",justifyContent:"center"}}>
              {
                details!==undefined?details.locations:("")
              }
            </Typography>
          </Col>
        </Row>
      </Paper>
    </Box>
    </Container>
    <Container style={{marginTop:"2rem"}}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {
          result!==undefined?
          <div>
          <Doughnut data={{
            labels: ["Passed","Failed"],
            datasets: [
              {
                label: '# of Votes',
                data: [result.pass,result.fail],
                backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }} />
          </div>:<div style={{display:"flex",justifyContent:"center", alignItems:"center",width:"100%",height:"100%",color:"grey",fontSize:"2rem",fontWeight:700}}>Graph not available</div>
        }
      </Grid>
      <Grid item xs={8}>
        {
          allResult!==undefined?
        <div>
        <Bar options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Results according to Cities',
            },
          },
        }} 
        data={{
          labels:allResult.lables,
          datasets: [
            {
              label: 'Passed',
              data: allResult.passed,
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: 'Failed',
              data: allResult.failed,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ],
        }} />
        </div>:<div style={{display:"flex",justifyContent:"center", alignItems:"center",width:"100%",height:"100%",color:"grey",fontSize:"2rem",fontWeight:700}}>Graph not available</div>
        }
      </Grid>
    </Grid>
    </Container>
    </>
  );
};