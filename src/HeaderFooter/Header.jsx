import React, { useState } from "react";
import { Bell, MessageCircle } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer.jsx";

const Header = () => {
    const navigate = useNavigate();
    const navLinkClass = ({ isActive }) =>
        `px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition
     ${isActive ? "bg-white/20" : "hover:bg-cyan-600"}`;
  return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* HEADER */}
            <header className="w-full bg-cyan-600 text-white px-6 py-3 flex items-center justify-between shadow">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <NavLink to={'/header'}>
                            <img
                            src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoatoi.png"
                            alt="HCMUT Logo"
                            className="w-20 h-auto cursor-pointer"
                        />
                        </NavLink>
                        <div className="hidden sm:block">
                            <div className="text-xs uppercase tracking-wide text-cyan-100">
                                HCMUT Consultation System
                            </div>
                            <div className="text-sm font-semibold">
                                Hệ thống tư vấn học tập
                            </div>
                        </div>
                    </div>

                    <nav className="flex items-center gap-1 text-sm">
                        <NavLink to="/header" end className={navLinkClass}>
                            Khám phá
                        </NavLink>
                        <NavLink to="/header" className={navLinkClass}>
                            Khoá học của tôi
                        </NavLink>
                        {/* <NavLink to="/student/lichcuatoi" className={navLinkClass}>
                            Lịch của tôi
                        </NavLink>
                        <NavLink to="/student/giangvien" className={navLinkClass}>
                            Giảng viên
                        </NavLink> */}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img
                            src="/img/avatar.png"
                            alt="Avatar"
                            className="w-9 h-9 rounded-full border border-white/60 object-cover"
                        />
                        <div className="hidden sm:block text-xs leading-tight">
                            <div className="font-semibold">Tên</div>
                            <div className="text-cyan-100">Vai trò</div>
                        </div>
                    </div>

                    <NavLink className=" bg-cyan-700 cursor-pointer p-2 rounded hover:bg-cyan-400 text-sm" to={'/login'}>
                        Đăng xuất
                    </NavLink>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 w-full ">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
                    <Outlet />
                </div>
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
  )
}

export default Header