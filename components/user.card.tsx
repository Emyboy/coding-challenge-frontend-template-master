import { Avatar, Card, CardBody, CardFooter, Text } from "grommet";
import React from "react";
import { Student } from "../services/students";
import Link from 'next/link'

type Props = {
  user: Student;
};

const UserCard: React.FC<Props> = ({ user }) => (
  <Link href={`/student/${user.id}`}>
    <Card height="small" width="small">
      <CardBody align="center" pad="medium">
        <Avatar src={user.avatar} />
      </CardBody>
      <CardFooter align="start" justify="center" pad="medium">
        <Text textAlign="center">{`${user["first_name"]} ${user["last_name"]}`}</Text>
      </CardFooter>
    </Card>
  </Link>
);

export default UserCard;
