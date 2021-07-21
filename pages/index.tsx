import { Box, TextInput } from "grommet";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import UserCard from "../components/user.card";
import { fetchStudent, fetchStudents, Student } from "../services/students";

type Props = {
  students: Student[];
};

const Main: React.FC<Props> = ({ students }) => {
  const onChangeHandler = (event: any) => {
    // TODO
  };

  return (
    <Box direction="column" pad="medium" height="100%" overflow="auto">
      <TextInput placeholder="type here" value="" onChange={onChangeHandler} />
      <Box direction="row" wrap={true}>
        {students.map((s) => (
          <Box margin="10px" key={s.id}>
            <UserCard user={s} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {

  const students:Student[] = await fetchStudents();

  return {
    props: {
      students,
    },
  };

}

export default Main;
