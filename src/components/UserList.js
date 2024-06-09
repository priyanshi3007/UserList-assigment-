import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api';
import {
  Container,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './UserList.css'; // For custom animations

const RootContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const SearchIconStyled = styled(SearchIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  marginRight: theme.spacing(2),
}));

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <RootContainer>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <SearchContainer>
        <SearchIconStyled />
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          <TransitionGroup>
            {filteredUsers.map(user => (
              <CSSTransition
                key={user.id}
                timeout={500}
                classNames="user-item"
              >
                <PaperStyled>
                  <Grid container alignItems="center">
                    <Grid item>
                      <AvatarStyled>
                        {user.name.charAt(0)}
                      </AvatarStyled>
                    </Grid>
                    <Grid item xs>
                      <ListItemText primary={user.name} secondary={user.email} />
                    </Grid>
                  </Grid>
                </PaperStyled>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </List>
      )}
    </RootContainer>
  );
};

export default UserList;
