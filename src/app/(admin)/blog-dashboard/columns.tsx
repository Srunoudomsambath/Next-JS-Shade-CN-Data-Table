"use client"

import { BlogType } from "@/types/blogtType"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<BlogType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "body",
    header: "Description",
  },
]