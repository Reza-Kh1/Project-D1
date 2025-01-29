import { useParams } from 'react-router-dom'
import EmploymentCompany from '../Employment/Employment'
import { EmploymentType } from '../../../types/typeCompany';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function SingleEmployment() {
    const { id } = useParams()
    const getData = async () => {
        const { data } = await axios.get(`employment?id=${id}`);
        return data;
    };
    const { data } = useQuery<EmploymentType>({
        queryKey: ["singlePloyment", Number(id)],
        queryFn: getData,
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
    });    
    if (!data) return    
    return (
        <div>
            <EmploymentCompany data={data} />
        </div>
    )
}
