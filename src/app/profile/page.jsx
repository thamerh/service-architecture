"use client"

import webService from "../../service/useService"
import { useEffect, useState } from "react"
import {useRouter }  from "next/navigation"

function page() {
    const router = useRouter()
const [loading, setLoading] = useState(false)
useEffect(() => {
    async function getData() {
        setLoading(true)
        try {
           const response =  await webService(router).companyTestApi()
           console.log("response", response)
        } catch (error) {
            console.error("error", error)
        } finally {
            setLoading(false)
        }
    }
    getData()
},[])
if (loading) {
    return <> ... laoding</>
}
  return (
    <div>get data</div>
  )
}

export default page