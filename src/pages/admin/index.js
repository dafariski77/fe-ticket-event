import AdminNavbar from '@/components/Admin/Navbar'
import { Card, CardBody, Container, Divider, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function AdminHome() {
  return (
    <AdminNavbar>
      <Container>
        <Card>
          <CardBody>
            <Text fontWeight={'bold'} fontSize={'2xl'}>Welcome to Admin Dashboard</Text>
            <Divider my={6} />
            <Text>Admin Page</Text>
          </CardBody>
        </Card>
      </Container>
    </AdminNavbar>
  )
}
