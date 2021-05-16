import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { CalendarPlus } from 'react-bootstrap-icons';
import axios from 'axios';
import './home.css';

export default function Home() {
    const [appts, setAppts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
          if (!isLoading) {
            return;
          }
      
          try {
            const loadedAppts = await loadAppts();
            setAppts(loadedAppts);
          } 
          catch(err) {
            console.log(err);
          }

          setIsLoading(false);
        }; 
        onLoad();
    }, [appts, isLoading]);

    async function loadAppts() {
        try {
            const authToken = localStorage.getItem("AuthToken");
            axios.defaults.headers.common["Authorization"] = authToken;
            const reqs = await axios.get("/appts");
            const apps = await axios.get("/appts/approve");
            //console.log("req appts: " + reqs.data);
            //console.log("approve appts: " + apps.data);
            let allAppts = [];
            if(reqs && apps) {
                allAppts = reqs.data.concat(apps.data);
            }
            else if(!reqs) {
                allAppts = apps.data;
            }
            else if(!apps) {
                allAppts = reqs.data;
            }
            return allAppts;
        }
        catch(err) {
            console.log(err);
        }
    }

    async function getApproverName(approverEmail) {
        const authToken = localStorage.getItem("AuthToken");
        axios.defaults.headers.common["Authorization"] = authToken;
        const approverInfo = await axios.get(`/user/${approverEmail}`);
        console.log(approverInfo.data.name);
        return approverInfo.data.name;
    }

    async function updateApproval(event, appt, approval) {
        console.log(approval);
        try {
            const updatedAppt = {
                requester: appt.requester,
                approver: appt.approver,
                date: appt.date,
                time: appt.time,
                pending: false,
                approved: approval,
                createdAt: appt.createdAt
            };
    
            const authToken = localStorage.getItem("AuthToken");
            axios.defaults.headers.common["Authorization"] = authToken;
            const response = await axios.put(`/appt/${appt.id}`, updatedAppt);
            console.log(response);
        }
        catch(err) {
            console.error(err);
        }
    }


    function renderApptList(appts) {
        console.log("renderApptList entered");
        const userEmail = localStorage.getItem("UserEmail");
        return (
            <div>
                <LinkContainer to="/newappt">
                    <ListGroup.Item action className="py-3 text-nowrap text-truncate">
                    <CalendarPlus size={17} />
                    <span className="ml-2 font-weight-bold">Schedule new appointment</span>
                    </ListGroup.Item>
                </LinkContainer>

                <h4 className="subtitle">All Appointments</h4>
                {appts.length > 0 &&
                appts.map((appt) => (
                    <LinkContainer key={appt.id} to={`/appt/${appt.id}`}>
                    <ListGroup.Item action>
                        {/*console.log("pending: " + appt.pending + " approved: " + appt.approved)*/}
                        <span className="font-weight-bold">
                        Appointment Date: {new Date(appt.date + " " + appt.time).toLocaleString()}
                        </span>
                        <br />
                        <span className="">
                            {/*console.log(getApproverName(appt.approver))*/}
                            With: {appt.requester === userEmail ? appt.approver : appt.requester}
                        </span>
                        <br />
                        <span className="text-muted">
                            Created: {new Date(appt.createdAt).toLocaleString()}
                        </span>
                        <br />
                        {(appt.pending && !appt.approved) &&
                            <span className="text-muted pending">
                                Pending approval
                            </span>
                        }
                        {(!appt.pending && !appt.approved ) &&
                            <span className="denied">
                                Denied
                            </span>
                        }
                        {(!appt.pending && appt.approved) &&
                            <span className="approved">
                                Approved
                            </span>
                        }
                        <br />
                    </ListGroup.Item>
                    </LinkContainer>
                ))}

                <h4 className="subtitle">Appointments for Approval</h4>
                    {appts.length > 0 &&
                    appts.map((appt) => {
                        return (appt.approver === userEmail && appt.pending) && (
                        
                            <LinkContainer key={appt.id} to={`/appt/${appt.id}`}>
                            <ListGroup.Item action>
                                <span className="font-weight-bold">
                                Appointment Date: {new Date(appt.date + " " + appt.time).toLocaleString()}
                                </span>
                                <br />
                                <span className="">
                                    Requester: {appt.requester}
                                </span>
                                <br />
                                <span className="text-muted">
                                    Created: {new Date(appt.createdAt).toLocaleString()}
                                </span>
                                <br />
                                <Button
                                className="approveBtn"
                                variant="success"
                                size="xs"
                                onClick={(e) => updateApproval(e, appt, true)}
                                >
                                    Approve
                                </Button>
                                <Button
                                className="denyBtn"
                                variant="danger"
                                size="xs"
                                onClick={(e) => updateApproval(e, appt, false)}
                                >
                                    Deny
                                </Button>
                                <br />
                            </ListGroup.Item>
                            </LinkContainer>
                        );
                    })}
            </div>
        ); 
    };

    function renderAppts() {
        return (
          <div className="appts">
            <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Appointments</h2>
            <ListGroup>{!isLoading && renderApptList(appts)}</ListGroup>
          </div>
        );
    }

    return (
        <div className="Home">
          {renderAppts()}
        </div>
    );
}