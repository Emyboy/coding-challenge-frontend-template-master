import { Box, TextInput } from "grommet";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import UserCard from "../components/user.card";
import { fetchStudent, fetchStudents, Student } from "../services/students";

type Props = {
  studentsList: Student[];
};

const Main: React.FC<Props> = ({ studentsList }) => {

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [students, setStudent] = useState<Student[]>(studentsList);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  useEffect(() => {
    if (searchKeyword) {
      setStudent(studentsList.filter(student => student.first_name.toLocaleLowerCase().includes(searchKeyword)
        || student.last_name.toLocaleLowerCase().includes(searchKeyword)))
    } else {
      setStudent(studentsList)
    }
  }, [searchKeyword])

  return (
    <Box direction="column" pad="medium" height="100%" overflow="auto">
      <TextInput placeholder="Search: First or Last Name" value={searchKeyword} onChange={onChangeHandler} />
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

  const studentsList: Student[] = await fetchStudents();

  return {
    props: {
      studentsList,
    },
  };

}

export default Main;
