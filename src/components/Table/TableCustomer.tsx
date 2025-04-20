"use client";
import { Pagination, Table, TableProps } from "antd";
import React, { useEffect, useState } from "react";

type TableCustomProps<T> = TableProps<T> & {
  dataPage?: {
    current: number;
    total: number;
    pageSize: number;
  };
  onPageChange?: (page: number, pageSize: number) => void;
};

function TableCustom<T extends object>({
  dataPage,
  onPageChange,
  ...rest
}: TableCustomProps<T>) {
  const [pagination, setPageination] = useState({
    current: dataPage?.current ?? 1,
    pageSize: dataPage?.pageSize ?? 5,
    total: dataPage?.total ?? rest?.dataSource?.length,
  });

  useEffect(() => {
    if (dataPage) {
      setPageination({
        current: dataPage.current,
        pageSize: dataPage.pageSize,
        total: dataPage.total,
      });
    }
  }, [dataPage]);

  const handlePage = (page: number, pageSize: number) => {
    setPageination((prev) => ({ ...prev, current: page, pageSize }));
    onPageChange?.(page, pageSize);
  };
  return (
    <div className=" shadow-lg">
      <Table pagination={false} {...rest} />
      <div className="flex justify-center  sm:justify-end py-4">
        <Pagination
          total={pagination.total}
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={handlePage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}

export default TableCustom;
