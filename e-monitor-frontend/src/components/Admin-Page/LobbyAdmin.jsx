import './LobbyAdmin.scss';
import { URL } from '../../scripts/scripts';


import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Components
import Nav from '../Nav/Nav';

// Icons
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdOutlinePersonRemove, MdOutlinePlaylistRemove } from "react-icons/md";

function AdminPage() {
    const navigate = useNavigate();

    const URL_GetSolicitations = URL + '/api/v1/admin/get-monitor-solicitations'
    const URL_Approvemonitor = URL + '/api/v1/admin/approve-monitor'
    const URL_RejectMonitor = URL + '/api/v1/admin/reject-monitor'

    const URL_GetReports = URL + '/api/v1/admin/get-reports'
    const URL_AcceptReport = URL + '/api/v1/admin/accept-report'
    const URL_RejectReport = URL + '/api/v1/admin/reject-report'

    const [solicitations, setSolicitations] = useState([]);
    const [reports, setReports] = useState([]);

    const token = localStorage.getItem('token');

    const [onSolicitations, setOnSolicitations] = useState(true);

    useEffect(() => {
        handleGetSolicitations();
        handleGetReports();
    }, []);

    const handleGetSolicitations = async () => {
        try {
            const response = await fetch(URL_GetSolicitations, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            })

            try {
                const data = await response.json();
                setSolicitations(data)
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetReports = async () => {
        try {
            const response = await fetch(URL_GetReports, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            })

            try {
                const data = await response.json();
                setReports(data)
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleApproveMonitor = async (e, userId) => {
        e.preventDefault();

        try {
            await fetch(`${URL_Approvemonitor}?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            })

            handleGetSolicitations();
        } catch (error) {
            console.log(error);
        }
    }

    const handleRejectMonitor = async (e, userId) => {
        e.preventDefault();

        try {
            await fetch(`${URL_RejectMonitor}?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            })

            handleGetSolicitations();
        } catch (error) {
            console.log(error);
        }
    }

    const handleAcceptReport = async (e, reportId) => {
        e.preventDefault();

        try {
            await fetch(`${URL_AcceptReport}?reportId=${reportId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            })

            handleGetReports();
        } catch (error) {
            console.log(error);
        }
    }

    const handleRejectReport = async (e, reportId) => {
        e.preventDefault();

        try {
            await fetch(`${URL_RejectReport}?reportId=${reportId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            })

            handleGetReports();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="admin-page">
            < Nav />
            <div className='swap-page'>
                <button className='button' onClick={() => setOnSolicitations(true)}>Solicitações</button>
                <button className='button' onClick={() => setOnSolicitations(false)}>Denúncias</button>
            </div>

            {
                onSolicitations ? (
                    solicitations.length === 0 ? (
                        <div className="no-solicitation">
                            <h1>Ainda não há Solicitações!</h1>
                        </div>
                    ) : (
                        < div className="solicitations-list" >
                            {
                                solicitations.map((solicitation, index) => (
                                    <div
                                        className="solicitation"
                                        key={index}
                                    >
                                        <div className="solicitation-info">
                                            <h3 className="solicitation-title">{solicitation.name}</h3>
                                            <p className="solicitation-status">{solicitation.email}</p>
                                        </div>

                                        <button
                                            className='action-btn'
                                            onClick={
                                                (e) => {
                                                    console.log(solicitation.id);
                                                    handleApproveMonitor(e, solicitation.id);
                                                }
                                            }
                                        >
                                            <AiOutlineCheck className='action-icon' />
                                        </button>

                                        <button
                                            className='action-btn'
                                            onClick={
                                                (e) => {
                                                    handleRejectMonitor(e, solicitation.id);
                                                }
                                            }
                                        >
                                            <AiOutlineClose className='action-icon' />
                                        </button>

                                    </div>
                                ))
                            }
                        </div >
                    )
                ) : (
                    reports.length === 0 ? (
                        <div className="no-solicitation">
                            <h1>Oba! Sem denúncias!</h1>
                        </div>
                    ) : (
                        < div className="solicitations-list" >
                            {
                                reports.map((report, index) => (
                                    <div
                                        className="solicitation"
                                        key={index}
                                    >
                                        <div className="solicitation-info">
                                            <h3 className="solicitation-title">Report</h3>
                                            <p className="solicitation-status">{report.id}</p>
                                        </div>

                                                                                    <button
                                                className='action-btn'
                                                onClick={
                                                    (e) => {
                                                        handleAcceptReport(e, report.id)
                                                    }
                                                }
                                            >
                                                <MdOutlinePersonRemove className='action-icon' />
                                            </button>

                                            <button
                                                className='action-btn'
                                                onClick={
                                                    (e) => {
                                                        handleRejectReport(e, report.id)
                                                    }
                                                }
                                            >
                                                <MdOutlinePlaylistRemove className='action-icon' />
                                            </button>
                                        
                                    </div>
                                ))
                            }
                        </div >
                    )
                )
            }
        </div>
    )
}

export default AdminPage;
