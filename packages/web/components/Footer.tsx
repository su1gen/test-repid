export default function Footer() {
    return <div className="flex justify-center mt-16 px-0 sm:items-center sm:justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400 sm:text-left">
            <div>Community of Change z.s.</div>
            <div>Školská 689/20, 110 00, Praha, Czech Republic</div>
            <div>Company Identification №.:17289475.</div>
        </div>

        <div className="ml-4 text-sm text-gray-500 dark:text-gray-400 sm:text-right sm:ml-0">
            <div><a target="_blank" className="text-blue-500"
                    href="https://reshim.org/files/privacy_notice/Community_Of_Change_Privacy_Notice_eng.pdf">Privacy
                Policy</a></div>
            <div>Community of Change z.s.</div>
            <div><a className="text-blue-500" href="mailto:info@coch.org">info@coch.org</a></div>
        </div>
    </div>
}