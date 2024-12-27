import { ArtworksDisplay } from '@/components/artworks/artworks-display'
import { SortFilterArtworks } from '@/components/artworks/sort-filter-artworks'
import { Pagination } from '@/components/artworks/pagination'

export default function Page() {
  return (
    <div className="flex flex-col">
      <div className="pt-8">
        <SortFilterArtworks />
      </div>
      <ArtworksDisplay />
      <div className="pt-8">
        <Pagination />
      </div>
    </div>
  )
}
