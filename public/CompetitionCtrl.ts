class CompetitionCtrl {
  public companion: ICompetitor;
  public opponent: ICompetitor;

  constructor(
      public competitorfactory: CompetitorFactory
    ) {
    this.companion = competitorfactory.create();
    this.opponent = competitorfactory.create();
  }
}
