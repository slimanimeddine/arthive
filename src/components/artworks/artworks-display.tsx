import SortFilterArtworks from "./sort-filter-artworks";
import ArtworksDisplayInner from "./artworks-display-inner";

export default function ArtworksDisplay() {
  return (
    <div className="flex flex-col">
      <div className="pt-8">
        <SortFilterArtworks />
      </div>
      <div className="bg-white">
        <ArtworksDisplayInner />
      </div>
    </div>
  );
}
