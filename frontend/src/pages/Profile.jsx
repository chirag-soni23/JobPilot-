import { useEffect, useMemo, useRef, useState } from "react";
import {
  User as UserIcon,
  Mail,
  BadgeCheck,
  Bookmark,
  Briefcase,
  Calendar,
  Edit3,
  Upload,
  Camera,
  Trash2,
  Loader2,
  MapPin,
  Building2,
  ChevronRight,
  Save,
  X,
  ChevronLeft,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { JobData } from "../context/JobContext";
import { UseJobApply } from "../context/JobApplyContext";
import ThemeToggle from "../components/ThemeToggle";

const TabBtn = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm md:text-base font-medium transition [&:focus-visible]:ring-2 [&:focus-visible]:ring-offset-2 [&:focus-visible]:ring-[#0A65CC] ${
      active
        ? "bg-[#0A65CC] text-white shadow"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
  >
    {children}
  </button>
);

const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl border dark:border-gray-800 bg-white dark:bg-gray-900">
    <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 shrink-0">
      <Icon className="w-6 h-6" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-xl font-semibold truncate">{value}</p>
    </div>
  </div>
);

const SectionCard = ({ title, action, children }) => (
  <div className="rounded-2xl border dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
    <div className="flex flex-wrap items-center gap-3 justify-between mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {action}
    </div>
    {children}
  </div>
);

const Placeholder = ({ title, subtitle, Icon = Bookmark }) => (
  <div className="text-center p-10 rounded-2xl border dark:border-gray-800 bg-white dark:bg-gray-900">
    <div className="mx-auto w-12 h-12 rounded-2xl grid place-items-center bg-gray-100 dark:bg-gray-800 mb-3">
      <Icon className="w-6 h-6" />
    </div>
    <h4 className="text-lg font-semibold">{title}</h4>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
  </div>
);

const SavedJobCard = ({ job, onRemove }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 justify-between p-4 rounded-xl border dark:border-gray-800 bg-white dark:bg-gray-900">
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2 min-w-0">
        <h4 className="font-semibold truncate">{job?.title || "Untitled Job"}</h4>
        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 shrink-0">
          {job?.type || "Full-time"}
        </span>
      </div>
      <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
        <span className="inline-flex items-center gap-1">
          <Building2 className="w-4 h-4" /> {job?.companyName || "Company"}
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {job?.location || job?.city || "India"}
        </span>
      </div>
    </div>
    <div className="flex sm:justify-end gap-2 w-full sm:w-auto">
      <Link
        to={`/jobdetails/${job?._id}`}
        className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg border dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 w-full sm:w-auto"
      >
        View <ChevronRight className="w-4 h-4" />
      </Link>
      <button
        onClick={() => onRemove?.(job?._id)}
        className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full sm:w-auto"
      >
        <Trash2 className="w-4 h-4" /> Remove
      </button>
    </div>
  </div>
);

const ApplicationCard = ({ app }) => {
  const job = app?.job || app;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 justify-between p-4 rounded-xl border dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold truncate">{job?.title || "Applied Position"}</h4>
        <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
          <span className="inline-flex items-center gap-1">
            <Building2 className="w-4 h-4" /> {job?.companyName || "Company"}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {job?.location || job?.city || "India"}
          </span>
        </div>
      </div>
      <Link
        to={`/jobdetails/${job?._id}`}
        className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg border dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 w-full sm:w-auto"
      >
        Track <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

const Pagination = ({ page, total, pageSize, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing <span className="font-medium">{start}</span> - <span className="font-medium">{end}</span> of{" "}
        <span className="font-medium">{total}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => canPrev && onPageChange?.(page - 1)}
          disabled={!canPrev}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border dark:border-gray-800 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <span className="text-sm px-2">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => canNext && onPageChange?.(page + 1)}
          disabled={!canNext}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border dark:border-gray-800 disabled:opacity-50"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

function PasswordField({ label, value, onChange, placeholder = "", name = "" }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="text-sm text-gray-600 dark:text-gray-300">{label}</label>
      <div className="mt-1 relative">
        <input
          type={show ? "text" : "password"}
          className="w-full pr-10 px-3 py-2 rounded-xl border dark:border-gray-800 bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          name={name}
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, uploadProfile, deleteProfile, updateAbout, updateName, btnLoading, updatePassword } = UserData();
  const { savedJobs, removeSavedJob, savedLoading, fetchSavedJobs } = JobData();
  const { applications, loadingApplications, getAllApplications } = UseJobApply();

  const [tab, setTab] = useState("overview");

  const initials = useMemo(() => {
    const name = (user?.name || "C U").trim();
    const parts = name.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] || "C";
    const second = parts[1]?.[0] || parts[0]?.[1] || "U";
    return (first + second).toUpperCase();
  }, [user?.name]);

  const [preview, setPreview] = useState(user?.profile?.url || "");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
  const fileRef = useRef(null);
  const [newName, setNewName] = useState(user?.name || "");

  const appliedCount = (Array.isArray(applications) ? applications.length : 0) || 0;
  const savedCount = (Array.isArray(savedJobs) ? savedJobs.length : 0) || 0;
  const joinDate = useMemo(
    () => (user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"),
    [user?.createdAt]
  );

  const defaultAbout = `Hello! I’m ${user?.name || "Rahul"}. Keep your information updated and apply to roles that fit your interests and skills.`;
  const [about, setAbout] = useState(user?.about || defaultAbout);
  const [editingAbout, setEditingAbout] = useState(false);
  const [aboutSaving, setAboutSaving] = useState(false);

  const isGoogleAuth = user?.authProvider === "google";
  const localKey = user?._id ? `pwd_set_${user._id}` : null;
  const persistedHasPwd = localKey ? localStorage.getItem(localKey) === "1" : false;
  const [hasLocalPassword, setHasLocalPassword] = useState(
    !isGoogleAuth || persistedHasPwd || Boolean(user?.hasPassword)
  );
  useEffect(() => {
    const val = !isGoogleAuth || persistedHasPwd || Boolean(user?.hasPassword);
    setHasLocalPassword(val);
  }, [isGoogleAuth, persistedHasPwd, user?.hasPassword]);

  const showOldField = !isGoogleAuth || hasLocalPassword;

  const [currPwd, setCurrPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMsg, setPwdMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    setAbout(user?.about || defaultAbout);
  }, [user?.about, user?.name]);

  const handleSaveAbout = async () => {
    try {
      setAboutSaving(true);
      await updateAbout(about);
      setEditingAbout(false);
    } finally {
      setAboutSaving(false);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    getAllApplications?.();
    fetchSavedJobs?.();
  }, []);

  const onChooseAvatar = () => fileRef.current?.click();
  const onAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    await uploadProfile?.(file);
  };

  const [appPage, setAppPage] = useState(1);
  const [savedPage, setSavedPage] = useState(1);

  useEffect(() => setAppPage(1), [applications?.length]);
  useEffect(() => setSavedPage(1), [savedJobs?.length]);
  useEffect(() => {
    if (tab === "applications") setAppPage(1);
    if (tab === "saved") setSavedPage(1);
  }, [tab]);

  const paginatedApplications = useMemo(() => {
    const list = Array.isArray(applications) ? applications : [];
    const start = (appPage - 1) * 4;
    return list.slice(start, start + 4);
  }, [applications, appPage]);

  const paginatedSaved = useMemo(() => {
    const list = Array.isArray(savedJobs) ? savedJobs : [];
    const start = (savedPage - 1) * 4;
    return list.slice(start, start + 4);
  }, [savedJobs, savedPage]);

  const validateNew = () => {
    if (newPwd.trim().length < 6) {
      setPwdMsg({ type: "error", text: "Password must be at least 6 characters." });
      return false;
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg({ type: "error", text: "New password and confirm password do not match." });
      return false;
    }
    return true;
  };

  const handleSetPassword = async () => {
    setPwdMsg({ type: "", text: "" });
    if (!validateNew()) return;
    try {
      setPwdLoading(true);
      await updatePassword("", newPwd, confirmPwd);
      setPwdMsg({ type: "success", text: "Password set successfully." });
      setNewPwd("");
      setConfirmPwd("");
      setHasLocalPassword(true);
      if (localKey) localStorage.setItem(localKey, "1");
    } catch {
      setPwdMsg({ type: "error", text: "Failed to set password." });
    } finally {
      setPwdLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setPwdMsg({ type: "", text: "" });
    if (!currPwd.trim()) {
      setPwdMsg({ type: "error", text: "Current password is required." });
      return;
    }
    if (!validateNew()) return;
    if (newPwd === currPwd) {
      setPwdMsg({ type: "error", text: "New password must be different from current password." });
      return;
    }
    try {
      setPwdLoading(true);
      await updatePassword(currPwd, newPwd, confirmPwd);
      setPwdMsg({ type: "success", text: "Password changed successfully." });
      setCurrPwd("");
      setNewPwd("");
      setConfirmPwd("");
      if (localKey) localStorage.setItem(localKey, "1");
    } catch {
      setPwdMsg({ type: "error", text: "Failed to change password." });
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="rounded-2xl border dark:border-gray-800 bg-white dark:bg-gray-900 p-6 mb-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="relative w-full md:w-auto shrink-0">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={
                    preview ||
                    `https://api.dicebear.com/9.x/initials/svg?radius=16&seed=${encodeURIComponent(
                      initials
                    )}`
                  }
                  alt="avatar"
                  className="w-28 h-28 rounded-2xl object-cover border dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
                />
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={onChooseAvatar}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm bg-[#0A65CC] text-white hover:bg-[#084ea0] transition-all duration-200 shadow-sm"
                    >
                      <Camera className="w-4 h-4" /> Change
                    </button>
                    {user?.profile?.url ? (
                      <button
                        onClick={() => {
                          setPreview("");
                          deleteProfile?.();
                        }}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm border opacity-60 cursor-not-allowed"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={onAvatarChange} />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {user?.name || "Rahul Singh"}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <BadgeCheck className="w-4 h-4" /> {user?.role || "candidate"}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="inline-flex items-center gap-2 min-w-0">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="truncate">{user?.email || "—"}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Joined {joinDate}
                </span>
                <span className="inline-flex items-center gap-2">
                  <UserIcon className="w-4 h-4" /> Profile{" "}
                  <span
                    className={`font-medium ${
                      user?.profile?.id ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {user?.profile?.id ? "linked" : "not linked"}
                  </span>
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Stat icon={Briefcase} label="Applied Jobs" value={appliedCount} />
                <Stat icon={Bookmark} label="Saved Jobs" value={savedCount} />
                <Stat icon={Upload} label="Avatar" value={user?.profile?.url ? "Uploaded" : "Default"} />
                <Stat icon={Calendar} label="Member Since" value={joinDate} />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 -mx-4 px-4">
            <div className="flex gap-2 mx-auto md:mx-0">
              <TabBtn active={tab === "overview"} onClick={() => setTab("overview")}>
                Overview
              </TabBtn>
              <TabBtn active={tab === "applications"} onClick={() => setTab("applications")}>
                Applications
              </TabBtn>
              <TabBtn active={tab === "saved"} onClick={() => setTab("saved")}>
                Saved
              </TabBtn>
              <TabBtn active={tab === "settings"} onClick={() => setTab("settings")}>
                Settings
              </TabBtn>
            </div>
          </div>
        </div>

        {tab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SectionCard
              title="About"
              action={
                !editingAbout ? (
                  <button
                    onClick={() => setEditingAbout(true)}
                    className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveAbout}
                      disabled={aboutSaving}
                      className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-[#0A65CC] text-white hover:bg-[#084ea0] disabled:opacity-60"
                    >
                      <Save className="w-4 h-4" />
                      {aboutSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setAbout(user?.about || defaultAbout);
                        setEditingAbout(false);
                      }}
                      className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                )
              }
            >
              {!editingAbout ? (
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-line">{about}</p>
              ) : (
                <div className="space-y-2">
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows={5}
                    maxLength={600}
                    className="w-full px-3 py-2 rounded-xl border dark:border-gray-800 bg-transparent outline-none text-sm"
                    placeholder="Write something about yourself..."
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Tip: Keep it crisp and job-focused.</span>
                    <span>{about.length}/600</span>
                  </div>
                </div>
              )}
            </SectionCard>

            <SectionCard title="Recent Activity">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between gap-4">
                  <span className="text-gray-600 dark:text-gray-300">Account created</span>
                  <span className="text-gray-500 dark:text-gray-400 shrink-0">{joinDate}</span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="text-gray-600 dark:text-gray-300">Applications submitted</span>
                  <span className="font-medium shrink-0">{appliedCount}</span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="text-gray-600 dark:text-gray-300">Jobs saved</span>
                  <span className="font-medium shrink-0">{savedCount}</span>
                </li>
              </ul>
            </SectionCard>

            <SectionCard title="Quick Actions">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
                <Link
                  to="/findjobs"
                  className="p-4 rounded-xl border dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-left"
                >
                  <Briefcase className="w-5 h-5 mb-2" />
                  Find Jobs
                </Link>
                <a
                  target="_blank"
                  href="https://job-pilot-dashboard.streamlit.app/"
                  className="p-4 rounded-xl border dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-left"
                  rel="noreferrer"
                >
                  <Bookmark className="w-5 h-5 mb-2" />
                  Go to Dashboard
                </a>
              </div>
            </SectionCard>
          </div>
        )}

        {tab === "applications" && (
          <SectionCard title="Your Applications">
            {loadingApplications ? (
              <div className="py-10 grid place-items-center">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : Array.isArray(applications) && applications.length > 0 ? (
              <>
                <div className="grid gap-3">
                  {paginatedApplications.map((app) => (
                    <ApplicationCard key={app?._id || app?.job?._id} app={app} />
                  ))}
                </div>
                <Pagination page={appPage} total={applications.length} pageSize={4} onPageChange={setAppPage} />
              </>
            ) : (
              <Placeholder title="No applications yet" subtitle="Apply to jobs and track them here." Icon={Briefcase} />
            )}
          </SectionCard>
        )}

        {tab === "saved" && (
          <SectionCard title="Saved Jobs">
            {savedLoading ? (
              <div className="py-10 grid place-items-center">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : Array.isArray(savedJobs) && savedJobs.length > 0 ? (
              <>
                <div className="grid gap-3">
                  {paginatedSaved.map((job) => (
                    <SavedJobCard key={job?._id} job={job} onRemove={removeSavedJob} />
                  ))}
                </div>
                <Pagination page={savedPage} total={savedJobs.length} pageSize={4} onPageChange={setSavedPage} />
              </>
            ) : (
              <Placeholder title="No saved jobs" subtitle="Bookmark jobs to review later." />
            )}
          </SectionCard>
        )}

        {tab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SectionCard title="Profile Details">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (newName.trim() && newName !== user?.name) {
                    await updateName(newName);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">Full Name</label>
                  <input
                    className="mt-1 w-full px-3 py-2 rounded-xl border dark:border-gray-800 bg-transparent outline-none"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">Email</label>
                  <input
                    disabled
                    className="mt-1 w-full px-3 py-2 rounded-xl border dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 outline-none"
                    value={user?.email || ""}
                    readOnly
                  />
                </div>
                <button
                  type="submit"
                  disabled={btnLoading || newName.trim() === user?.name}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A65CC] text-white hover:bg-[#084ea0] disabled:opacity-60"
                >
                  {btnLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
              </form>
            </SectionCard>

            <SectionCard
              title="Password"
              action={
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                  <ShieldCheck className="w-4 h-4" /> {showOldField ? "Change Password" : "Set Password"}
                </span>
              }
            >
              <div className="space-y-4">
                {showOldField && (
                  <PasswordField
                    label="Current Password"
                    value={currPwd}
                    onChange={setCurrPwd}
                    placeholder="Enter current password"
                    name="current-password"
                  />
                )}
                <PasswordField
                  label="New Password"
                  value={newPwd}
                  onChange={setNewPwd}
                  placeholder="Enter new password (min 6 chars)"
                  name="new-password"
                />
                <PasswordField
                  label="Confirm New Password"
                  value={confirmPwd}
                  onChange={setConfirmPwd}
                  placeholder="Re-enter new password"
                  name="confirm-password"
                />
                {pwdMsg.text ? (
                  <div
                    className={`text-sm ${
                      pwdMsg.type === "error" ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {pwdMsg.text}
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={showOldField ? handleChangePassword : handleSetPassword}
                  disabled={pwdLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A65CC] text-white hover:bg-[#084ea0] disabled:opacity-60"
                >
                  {pwdLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {showOldField ? "Updating..." : "Setting..."}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {showOldField ? "Update Password" : "Set Password"}
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400">Use at least 6 characters.</p>
              </div>
            </SectionCard>

            <SectionCard title="Appearance">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-medium">Theme</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Switch between Light and Dark.</p>
                </div>
                <ThemeToggle />
              </div>
            </SectionCard>
          </div>
        )}
      </main>
    </div>
  );
}
