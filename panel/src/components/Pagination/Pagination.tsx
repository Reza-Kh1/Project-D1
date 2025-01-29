import { IconButton } from "@mui/material";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { PaginationType } from "../../types/typeCompany";
export default function Pagination({ pager }: { pager?: PaginationType }) {
  if (!pager || !pager.allPage) return;
  const { search, pathname } = useLocation();
  let { page, ...other } = queryString.parse(search) as any;
  const searchQuery = new URLSearchParams(other);
  page = page || (1 as any);
  const startPage = Math.max(1, Number(page) - 3);
  const endPage = Math.min(pager.allPage, Number(page) + 3);
  const navigate = useNavigate()
  const Linkreplace = (value: string) => {
    navigate(value, { replace: true })
  }
  return (
    <div className="flex justify-between items-center mt-8">
      {
        pager?.prevPage ?
          <button
            title="pagination"
            type="button"
            onClick={() => Linkreplace(pathname + `?page=${pager.prevPage ? Number(page) - 1 : page}&${searchQuery}`)}
          >
            <IconButton className="shadow-md !bg-[#6198f7]" disabled={pager.prevPage ? false : true}>
              <FaAnglesRight size={22} color="#ededed" />
            </IconButton>
          </button>
          :
          <IconButton disabled={true}>
            <FaAnglesRight size={22} />
          </IconButton>
      }
      <div className="flex gap-2 items-center justify-evenly">
        {Number(page) > 4 && (
          <>
            <button
              title="pagination"
              type="button"
              onClick={() => Linkreplace(`${pathname}?page=${1}&${searchQuery}`)}
            >
              <IconButton size="small" className="shadow-md !px-4 !bg-[#6198f7]">
                <span className="text-gray-50 pt-1">
                  1
                </span>
              </IconButton>
            </button>
            <span>...</span>
          </>
        )}
        {pager.allPage
          ? Array.from(
            { length: Math.min(11, endPage - startPage + 1) },
            (_, i) => startPage + i
          ).map((i) => {
            return i === Number(page) ?
              <IconButton key={i} disabled={Number(page) === i} size="small" className={`!px-4 shadow-md ${i === Number(page) ? "!bg-[#9db4c8]" : "!bg-[#6198f7]"}`}>
                <span className="text-gray-50 pt-1">
                  {i}
                </span>
              </IconButton>
              :
              <button
                title="pagination"
                type="button"
                onClick={() => Linkreplace(`${pathname}?page=${i}&${searchQuery}`)}
                key={i}>
                <IconButton disabled={Number(page) === i} size="small" className={`!px-4 shadow-md ${i === Number(page) ? "!bg-[#9db4c8]" : "!bg-[#6198f7]"}`}>
                  <span className="text-gray-50 pt-1">
                    {i}
                  </span>
                </IconButton>
              </button>
          })
          : null}
        {pager.allPage - Number(page) > 3 && (
          <>
            <span>...</span>
            <button
              title="pagination"
              type="button"
              onClick={() => Linkreplace(`${pathname}?page=${pager.allPage}&${searchQuery}`)}
            >
              <IconButton size="small" className="shadow-md !px-4 !bg-[#6198f7]">
                <span className="text-gray-50 pt-1">
                  {pager.allPage}
                </span>
              </IconButton>
            </button>
          </>
        )}
      </div>
      {
        pager.nextPage ?
          <button
            title="pagination"
            type="button"
            onClick={() => Linkreplace(pathname + `?page=${pager.prevPage ? Number(page) + 1 : page}&${searchQuery}`)}
          >
            <IconButton className="shadow-md !bg-[#6198f7]" disabled={pager.nextPage ? false : true}>
              <FaAnglesLeft size={22} color="#ededed" />
            </IconButton>
          </button>
          :
          <IconButton disabled={true}>
            <FaAnglesLeft size={22} />
          </IconButton>
      }
    </div >
  );
}
