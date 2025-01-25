import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

interface UserCardProps {
  user: {
    id: number;
    name: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6">{user.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
