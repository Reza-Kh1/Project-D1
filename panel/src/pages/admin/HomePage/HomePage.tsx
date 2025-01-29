import { Outlet } from 'react-router-dom'
import Header from '../../../components/Header/Header'
export default function HomePageAdmin() {
    return (
        <main>
            <Header />
            <div className='mt-3'>
                <Outlet />
            </div>
        </main>
    )
}
