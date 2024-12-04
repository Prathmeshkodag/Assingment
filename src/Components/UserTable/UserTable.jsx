import React from 'react'

function UserTable() {
    return (
        <>
        <div class="flex items-center content-center">
            <table class="border-collapse border border-slate-400 ...">
                <thead>
                    <tr>
                        <th class="border border-slate-300 ...">Name</th>
                        <th class="border border-slate-300 ...">Email</th>
                        <th class="border border-slate-300 ...">Phone</th>
                        <th class="border border-slate-300 ...">Company Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border border-slate-300 ...">Indiana</td>
                        <td class="border border-slate-300 ...">Indianapolis</td>
                        <td class="border border-slate-300 ...">Indiana</td>
                        <td class="border border-slate-300 ...">Indianapolis</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>  
        </>
    )
}

export default UserTable