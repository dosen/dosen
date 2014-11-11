class CompetitorFactory {
  constructor(
    private extractor: Extractor,
    private wikipedia: Wikipedia
  ) {
  }

  public create(): Competitor {
    return new Competitor(this.extractor, this.wikipedia);
  }
}
