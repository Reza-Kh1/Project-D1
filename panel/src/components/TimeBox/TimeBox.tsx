import DatePicker from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
interface TimeBoxProps {
    value: Date | string | null; // تایپ های مجاز برای value
    setValue: (value: any) => void; // تابعی برای تنظیم مقدار value
}
export default function TimeBox({ value, setValue }: TimeBoxProps) {
    return (
        <DatePicker
            value={value ? new Date(value) : ""}
            onChange={setValue}
            disableDayPicker
            format="HH:mm"
            plugins={[
                <TimePicker hideSeconds />
            ]}
        />
    )
}
