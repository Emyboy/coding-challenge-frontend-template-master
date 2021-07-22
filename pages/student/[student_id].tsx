import React, { Context, ReactElement } from 'react'
import { Card, Text, CardBody, Avatar, Button, Box } from 'grommet'
import { fetchStudent, Student } from '../../services/students'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface Props {
    student: Student;
}

export default function StuentDetailsPage({ student }: Props): ReactElement {
    const router = useRouter();
    return (
        <Box
            pad="large"
            alignSelf="center"
        >
            <Card height="medium" width="large" background='background-front'>
                <CardBody align="center">
                    <Avatar src={student.avatar} size="large" />
                    <Box>
                        <Text weight='bold' textAlign="center" size='xlarge'>{`${student["first_name"]} ${student["last_name"]}`}</Text>
                        <Text textAlign="center" size='small'>{`${student["email"]}`}</Text>
                        <Box pad='large' width='large' >
                            <Box direction='row' width='large'>
                                <Text size='medium' weight='bold'>Job:</Text>
                                <Text size='medium' >{`${student["job"]}`}</Text>
                            </Box>
                            <Box direction='row' >
                                <Text size='medium' weight='bold'>Company:</Text>
                                <Text size='medium' >{`${student["company"]}`}</Text>
                            </Box>
                        </Box>
                    </Box>
                    <Button primary label="Go Back" onClick={() => router.back()} />
                </CardBody>
            </Card>
        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { student_id } = ctx.query;
    const student: Student = await fetchStudent(`${student_id}`);

    return {
        props: {
            student,
        },
    };

}