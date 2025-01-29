import React, { useEffect, useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import software from '../../data/software'
import InputeCustom from '../InputeCustom/InputeCustom'
import { alpha, Button, Menu, MenuItem, MenuProps, OutlinedInput, Select, styled } from '@mui/material'
import { SoftwareType } from '../../types/typeExpert'
const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));
type FormSoftwareType = {
    setSelectSoftware: (value: SoftwareType[]) => void
    selectSoftware: SoftwareType[]
    isEmployment?: string
}
export default function FormSoftware({ isEmployment, setSelectSoftware, selectSoftware }: FormSoftwareType) {
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "")
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [categorySoftware, setCategorySoftware] = useState<string>("نرم افزار های عمومی")
    const [searchSoftware, setSearchSoftware] = useState<string[]>()
    const [detailAdd, setDetailAdd] = useState<string | null>(null)
    const [valueSearch, setValueSearch] = useState<string>("")
    const [limitSoftware, setLimitSoftware] = useState<string>("")
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, software: string) => {
        setDetailAdd(software)
        setAnchorEl(event.currentTarget);
    };
    const isSoftwareSelected = (name: string) => {
        return selectSoftware?.some((item) => item.name === name);
    };
    const searchHandler = (value: string) => {
        const softwareBox = software.flatMap(category => Object.values(category).flat())
        setValueSearch(value)
        const data = softwareBox.filter(item =>
            item.toLowerCase().includes(value)
        );
        if (value.length) {
            setCategorySoftware("s")
            setSearchSoftware(data)
        } else {
            setSearchSoftware([])
        }
    }
    const deleteSoftware = (value: string) => {
        const newSoft = selectSoftware.filter((item) => item.name !== value)
        const del = newSoft.find((item) => {
            if (!item.tag.includes("زبان های برنامه نویسی") && !item.tag.includes("نرم افزار های عمومی")) {
                return item
            }
        })
        if (del) {
            setLimitSoftware(del?.tag)
        } else {
            setLimitSoftware("")
        }
        setSelectSoftware(newSoft)
    }
    const handleChange = (event: any) => {
        const name = event.target.value
        setCategorySoftware(name)
        const soft = software as any
        const finder = soft.find((item: string[]) => item[name])
        setValueSearch("")
        setSearchSoftware(finder[name])
    };
    const addSoftware = (lvl: string, name: string | null) => {
        if (!categorySoftware.includes("زبان های برنامه نویسی") && !categorySoftware.includes("نرم افزار های عمومی")) {
            setLimitSoftware(categorySoftware)
        }
        setAnchorEl(null)
        if (!name) return
        if (selectSoftware?.some((item) => item.name === name) || !lvl) return
        if (isEmployment || idProfile.type === "company") {
            const newSoft = [...selectSoftware, { name, lvl, employmentId: isEmployment, tag: categorySoftware }]
            setSelectSoftware(newSoft)
        } else {
            const newSoft = [...selectSoftware, { name, lvl, userId: idProfile.id, tag: categorySoftware }]
            setSelectSoftware(newSoft)
        }
    }
    useEffect(() => {
        if (!searchSoftware?.length) {
            const firstObject = (software as any)[0]["نرم افزار های عمومی"]
            setSearchSoftware(firstObject)
        }
        if (selectSoftware?.length) {
            const del = selectSoftware.find((item) => {
                if (!item.tag.includes("زبان های برنامه نویسی") && !item.tag.includes("نرم افزار های عمومی")) {
                    return item
                }
            })
            if (del) {

                setLimitSoftware(del?.tag)
            } else {
                setLimitSoftware("")
            }
        }

    }, [selectSoftware])
    return (
        <>
            <p className='font-semibold text-md mb-3'>
                مهارت های نرم افزاری
            </p>
            <div className='w-full flex gap-5'>
                <div className='w-3/12 flex flex-col gap-3'>
                    <InputeCustom name='software' value={valueSearch} placeholder='جستجوی نرم افزار' onChange={searchHandler} />
                    <div className='flex flex-col gap-2'>
                        <span className='text-sm'>دسته نرم افزارها :</span>
                        <Select
                            value={categorySoftware}
                            onChange={handleChange}
                            className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            input={<OutlinedInput label="Name" />}
                        >
                            <MenuItem value={"s"} disabled>تمام دسته ها</MenuItem>
                            {software.map((item, index) => {
                                if (limitSoftware) {
                                    if (!["نرم افزار های عمومی", "زبان های برنامه نویسی", limitSoftware].includes(Object.keys(item)[0])) return
                                }
                                return <MenuItem key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</MenuItem>
                            })}
                        </Select>
                    </div>
                </div>
                {searchSoftware?.length ?
                    <div className='w-9/12 flex flex-col bg-gray-100 shadow-md rounded-md p-3 max-h-[450px] overflow-y-auto custom-scroll'>
                        <p className='mb-3 font-semibold'>نرم افزار های مرتبط</p>
                        <section className='flex flex-wrap gap-3'>
                            {searchSoftware.map((software, index) => (
                                <div key={index}>
                                    <Button
                                        variant="contained"
                                        onClick={(event) => handleMenuOpen(event, software)}
                                        className={`${isSoftwareSelected(software) ? "bg-gray-400" : "!bg-blue-400"} p-3 !rounded-full flex gap-3 items-center`}
                                        disabled={isSoftwareSelected(software)}
                                    >
                                        <span>{software}</span>
                                        <FaPlus />
                                    </Button>
                                </div>
                            ))}
                            <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={() => addSoftware("مقدماتی", detailAdd)}>
                                    مقدماتی
                                </MenuItem>
                                <MenuItem onClick={() => addSoftware("متوسط", detailAdd)} disableRipple>
                                    متوسط
                                </MenuItem>
                                <MenuItem onClick={() => addSoftware("پیشرفته", detailAdd)} disableRipple>
                                    پیشرفته
                                </MenuItem>
                            </StyledMenu>
                        </section>
                    </div>
                    : null}
            </div >
            {
                selectSoftware?.length ?
                    <div className='bg-gray-100 shadow-md rounded-md p-3 mt-6'>
                        <p className='mb-3 font-semibold'>نرم افزار های انتخاب شده </p>
                        <section className='flex flex-wrap gap-3'>
                            {selectSoftware.map((i, index) => (
                                <button key={index} onClick={() => deleteSoftware(i.name)} type='button' className={`${selectSoftware.includes(i) ? "bg-grid" : "bg-gradient-to-l to-slate-300/50 shadow-md from-blue-400"} p-3 !rounded-full flex gap-3 items-center `}>
                                    <span>{i.name}</span>
                                    <span>({i.lvl})</span>
                                    <FaTrash />
                                </button>
                            ))}
                        </section>
                    </div>
                    : null
            }
        </>
    )
}
