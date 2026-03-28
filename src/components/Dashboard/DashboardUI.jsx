// Reusable styled table shell used across all dashboard pages

export const TableCard = ({ children }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {children}
    </div>
)

export const TableHeader = ({ title, subtitle, action }) => (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
            <h3 className="font-bold text-gray-900 text-base" style={{ fontFamily: "'Syne', sans-serif" }}>
                {title}
            </h3>
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
    </div>
)

export const Table = ({ headers = [], children, empty }) => (
    <div className="overflow-x-auto">
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                    {headers.map((h) => (
                        <th
                            key={h}
                            className="text-left px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500"
                        >
                            {h}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
        {empty && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="text-4xl mb-3 opacity-40">📭</div>
                <p className="text-sm text-gray-500">{empty}</p>
            </div>
        )}
    </div>
)

export const PageHead = ({ title, subtitle, action }) => (
    <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
            <h2 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                {title}
            </h2>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
    </div>
)

export const StatusBadge = ({ status }) => {
    const map = {
        approved: 'bg-teal-50 text-teal-700',
        active: 'bg-teal-50 text-teal-700',
        paid: 'bg-teal-50 text-teal-700',
        pending: 'bg-amber-50 text-amber-700',
        rejected: 'bg-red-50 text-red-600',
        refunded: 'bg-red-50 text-red-600',
    }
    const dot = {
        approved: 'bg-teal-500', active: 'bg-teal-500', paid: 'bg-teal-500',
        pending: 'bg-amber-500',
        rejected: 'bg-red-500', refunded: 'bg-red-500',
    }
    const key = status?.toLowerCase()
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${map[key] || 'bg-gray-100 text-gray-500'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dot[key] || 'bg-gray-400'}`} />
            {status}
        </span>
    )
}

export const ActionBtn = ({ variant = 'edit', onClick, children }) => {
    const styles = {
        approve: 'bg-teal-50 text-teal-700 hover:bg-teal-500 hover:text-white',
        reject: 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white',
        edit: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white',
        delete: 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white',
    }
    return (
        <button
            onClick={onClick}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${styles[variant] || styles.edit}`}
        >
            {children}
        </button>
    )
}