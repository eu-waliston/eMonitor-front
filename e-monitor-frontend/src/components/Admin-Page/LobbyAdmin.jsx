import './LobbyAdmin.scss';
import { URL } from '../../scripts/scripts';


import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Components
import Nav from '../Nav/Nav';
import ConfirmActions from '../ConfirmActions/ConfirmActions';

// Icons
import { AiOutlineCheck, AiOutlineClose, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
    const [isExpanded, setIsExpanded] = useState(null);

    const [popupText, setPopupText] = useState('');
    const [showAproveMonitor, setShowAproveMonitor] = useState(false);
    const [showRejectMonitor, setShowRejectMonitor] = useState(false);
    const [solicitationId, setSolicitationId] = useState(null);

    const [showAcceptReport, setShowAcceptReport] = useState(false);
    const [showRejectReport, setShowRejectReport] = useState(false);
    const [reportId, setReportId] = useState(null);

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

    const handleApproveMonitor = async (userId) => {
        //e.preventDefault();

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

    const handleRejectMonitor = async (userId) => {
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

    const handleAcceptReport = async (reportId) => {
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

    const handleRejectReport = async (reportId) => {
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
                                                    setPopupText('Tem certeza que deseja aprovar esse usuário como monitor?')
                                                    setSolicitationId(solicitation.id)
                                                    setShowAproveMonitor(true)
                                                }
                                            }
                                            title='Aprovar'
                                        >
                                            <AiOutlineCheck className='action-icon' />
                                        </button>

                                        <ConfirmActions
                                            showPopup={showAproveMonitor}
                                            setshowPopup={setShowAproveMonitor}
                                            popupText={popupText}
                                            confirmAction={(confirmed) => {
                                                if (confirmed) {
                                                    handleApproveMonitor(solicitationId);
                                                }
                                            }}
                                        />

                                        <button
                                            className='action-btn'
                                            onClick={
                                                (e) => {
                                                    setPopupText('Tem certeza que deseja recusar esse usuário como monitor?')
                                                    setSolicitationId(solicitation.id)
                                                    setShowRejectMonitor(true)
                                                }
                                            }
                                            title='Rejeitar'
                                        >
                                            <AiOutlineClose className='action-icon' />
                                        </button>

                                        <ConfirmActions
                                            showPopup={showRejectMonitor}
                                            setshowPopup={setShowRejectMonitor}
                                            popupText={popupText}
                                            confirmAction={(confirmed) => {
                                                if (confirmed) {
                                                    handleRejectMonitor(solicitationId);
                                                }
                                            }}
                                        />

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
                                        onClick={() => {
                                            localStorage.setItem("ticketId", report.ticketId);
                                            localStorage.setItem("authorId", report.authorId);
                                            navigate('/chatAdm', { replace: true })
                                        }}
                                    >
                                        <div className="solicitation-info">
                                            <h3 className="solicitation-title">{report.title}</h3>
                                            <p className="solicitation-status">{isExpanded === report.id ? report.context : report.context.substring(0, 20) + '...'}</p>
                                        </div>

                                        <button
                                            className='action-btn'
                                            onClick={
                                                (e) => {
                                                    e.stopPropagation();
                                                    if (isExpanded === report.id) {
                                                        setIsExpanded(null);
                                                    } else {
                                                        setIsExpanded(report.id);
                                                    }
                                                }
                                            }
                                            title='Expandir'
                                        >
                                            <AiFillEye className='action-icon' />
                                        </button>

                                        <button
                                            className='action-btn'
                                            onClick={
                                                (e) => {
                                                    e.stopPropagation();

                                                    setPopupText('Tem certeza que deseja banir esse usuário?')
                                                    setReportId(report.id)
                                                    setShowAcceptReport(true)
                                                }
                                            }
                                            title='Aceitar denúncia'
                                        >
                                            <MdOutlinePersonRemove className='action-icon' />
                                        </button>

                                        <ConfirmActions
                                            showPopup={showAcceptReport}
                                            setshowPopup={setShowAcceptReport}
                                            popupText={popupText}
                                            confirmAction={(confirmed) => {
                                                if (confirmed) {
                                                    handleAcceptReport(reportId)
                                                }
                                            }}
                                        />

                                        <button
                                            className='action-btn'
                                            onClick={
                                                (e) => {
                                                    e.stopPropagation();

                                                    setPopupText('Tem certeza que deseja descartar essa denúncia?')
                                                    setReportId(report.id)
                                                    setShowRejectReport(true)
                                                }
                                            }
                                            title='Rejeitar denúncia'
                                        >
                                            <MdOutlinePlaylistRemove className='action-icon' />
                                        </button>

                                        <ConfirmActions
                                            showPopup={showRejectReport}
                                            setshowPopup={setShowRejectReport}
                                            popupText={popupText}
                                            confirmAction={(confirmed) => {
                                                if (confirmed) {
                                                    handleRejectReport(reportId)
                                                }
                                            }}
                                        />

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
