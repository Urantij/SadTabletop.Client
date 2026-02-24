enum SoundCategory {
  Effect,
  Music
}

export function getSoundCategoryName(category: SoundCategory | null) {
  switch (category) {
    case SoundCategory.Music: return "музик";
    case SoundCategory.Effect: return "фефекты";
    case null: return "маста";
    default: return "...";
  }
}

export default SoundCategory;
