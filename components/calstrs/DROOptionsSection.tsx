interface DROOptionsSectionProps {}

export default function DROOptionsSection({}: DROOptionsSectionProps) {
  return (
    <section className="mb-24">
      <h2 className="mb-14 text-4xl font-bold leading-tight text-center text-white">
        CalSTRS DRO Division Methods
      </h2>
      <div className="grid gap-12 grid-cols-[1fr]">
        {/* Separate Interest */}
        <article className="overflow-hidden relative p-12 rounded-3xl border-2 border-solid bg-blue-400 bg-opacity-10 border-blue-400 border-opacity-20">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-blue-400" />
          <div className="grid gap-12 items-start grid-cols-[1fr_2fr] max-md:gap-8 max-md:grid-cols-[1fr]">
            <div>
              <div className="px-6 py-4 mb-6 text-lg font-semibold text-center text-white bg-blue-400 rounded-xl">
                SEPARATE INTEREST
              </div>
              <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
                Separate Interest
              </h3>
              <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                Creates a completely separate CalSTRS account for the former
                spouse, allowing independent retirement decisions and benefit
                elections.
              </p>
              <div className="p-5 mb-6 rounded-xl bg-blue-400 bg-opacity-10">
                <h4 className="mb-3 text-lg font-semibold text-blue-400">
                  Best For:
                </h4>
                <p className="text-base leading-relaxed text-zinc-300">
                  Active CalSTRS members who want to give their former spouse
                  complete control over their portion of the teacher retirement
                  benefits.
                </p>
              </div>
            </div>
            <div>
              <h4 className="mb-5 text-xl font-semibold text-white">
                Key Features:
              </h4>
              <div className="grid gap-6 mb-8 grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr]">
                <div className="p-5 rounded-xl bg-white bg-opacity-10">
                  <h5 className="mb-2 text-lg font-semibold text-white">
                    ✓ Independent Control
                  </h5>
                  <p className="text-sm leading-normal text-zinc-300">
                    Former spouse controls their own retirement timing and
                    benefit options
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white bg-opacity-10">
                  <h5 className="mb-2 text-lg font-semibold text-white">
                    ✓ Separate CalSTRS Account
                  </h5>
                  <p className="text-sm leading-normal text-zinc-300">
                    Creates two distinct CalSTRS accounts with separate benefit
                    calculations
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white bg-opacity-10">
                  <h5 className="mb-2 text-lg font-semibold text-white">
                    ✓ Medicare Supplement
                  </h5>
                  <p className="text-sm leading-normal text-zinc-300">
                    Former spouse may be eligible for CalSTRS Medicare
                    Supplement upon retirement
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white bg-opacity-10">
                  <h5 className="mb-2 text-lg font-semibold text-white">
                    ✓ Survivor Benefits
                  </h5>
                  <p className="text-sm leading-normal text-zinc-300">
                    Former spouse can designate their own beneficiaries for
                    their account
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-solid bg-white bg-opacity-0 border-white border-opacity-10">
                <h5 className="mb-3 text-lg font-semibold text-white">
                  Important Requirements:
                </h5>
                <ul className="pl-5 text-base leading-relaxed text-zinc-300">
                  <li className="mb-2">
                    Member must not be retired at time of DRO filing
                  </li>
                  <li className="mb-2">
                    Minimum service credit requirements must be met (typically 5
                    years)
                  </li>
                  <li>
                    Former spouse becomes a CalSTRS member with all associated
                    rights and responsibilities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        {/* Shared Interest */}
        <article className="overflow-hidden relative p-12 rounded-3xl border-2 border-solid bg-violet-800 bg-opacity-10 border-violet-800 border-opacity-20">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-violet-800" />
          <div className="grid gap-12 items-start grid-cols-[1fr_2fr] max-md:gap-8 max-md:grid-cols-[1fr]">
            <div>
              <div className="px-6 py-4 mb-6 text-lg font-semibold text-center text-white bg-violet-800 rounded-xl">
                SHARED INTEREST
              </div>
              <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
                Shared Interest
              </h3>
              <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                Divides the member's retirement benefit based on the ratio of
                service credit earned during marriage to total service credit.
                Former spouse receives payments when member retires.
              </p>
              <div className="p-5 mb-6 rounded-xl bg-violet-800 bg-opacity-10">
                <h4 className="mb-3 text-lg font-semibold text-violet-800">
                  Best For:
                </h4>
                <p className="text-base leading-relaxed text-zinc-300">
                  Cases where the teacher has significant pre-marital or
                  post-separation service credit, and a proportional division is
                  desired without creating separate accounts.
                </p>
              </div>
            </div>
            <div>
              <h4 className="mb-5 text-xl font-semibold text-white">
                How It Works:
              </h4>
              <div className="p-8 mb-8 text-center rounded-2xl bg-white bg-opacity-10">
                <h5 className="mb-4 text-xl font-semibold text-white">
                  CalSTRS Time Rule Formula
                </h5>
                <div className="p-5 text-lg leading-relaxed rounded-lg bg-black bg-opacity-30 text-zinc-300">
                  Community Property Share = <br />
                  (Service Credit During Marriage ÷ Total Service Credit) × 50%
                </div>
              </div>
              <div className="grid gap-6 mb-8 grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr]">
                <div className="p-5 rounded-xl bg-white bg-opacity-10">
                  <h5 className="mb-2 text-lg font-semibold text-white">
                    ✓ Proportional Division
                  </h5>
                  <p className="text-sm leading-normal text-zinc-300">
                    Fair division based on actual service credit earned during
                    marriage
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white bg-opacity-10">
                  <h5 className="mb-2 text-lg font-semibold text-white">
                    ✓ Member Controls Timing
                  </h5>
                  <p className="text-sm leading-normal text-zinc-300">
                    Member decides when to retire; former spouse receives
                    payments when member retires
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white bg-opacity-10">
                  <h5 className="mb-2 text-lg font-semibold text-white">
                    ✓ Cost of Living Adjustments
                  </h5>
                  <p className="text-sm leading-normal text-zinc-300">
                    Former spouse receives same COLA increases as the member
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white bg-opacity-10">
                  <h5 className="mb-2 text-lg font-semibold text-white">
                    ✓ Flexible Implementation
                  </h5>
                  <p className="text-sm leading-normal text-zinc-300">
                    Can be used whether member is active or already retired
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-solid bg-white bg-opacity-0 border-white border-opacity-10">
                <h5 className="mb-3 text-lg font-semibold text-white">
                  Example Calculation:
                </h5>
                <p className="mb-3 text-base leading-relaxed text-zinc-300">
                  Member has 20 years total service, 10 years earned during
                  marriage:
                </p>
                <p className="p-3 text-base leading-relaxed rounded-md bg-black bg-opacity-30 text-zinc-300">
                  Former spouse share = (10 ÷ 20) × 50% = 25% of total benefit
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Retired Member */}
        <article className="overflow-hidden relative p-12 rounded-3xl border-2 border-solid bg-green-400 bg-opacity-10 border-green-400 border-opacity-20">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-green-400" />
          <div className="grid gap-12 items-start grid-cols-[1fr_2fr] max-md:gap-8 max-md:grid-cols-[1fr]">
            <div>
              <div className="px-6 py-4 mb-6 text-lg font-semibold text-center text-white bg-green-400 rounded-xl">
                RETIRED MEMBER
              </div>
              <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
                Retired Member
              </h3>
              <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                Used when the CalSTRS member is already retired and receiving
                monthly pension payments at the time of divorce.
              </p>
              <div className="p-5 mb-6 rounded-xl bg-green-400 bg-opacity-10">
                <h4 className="mb-3 text-lg font-semibold text-green-400">
                  Best For:
                </h4>
                <p className="text-base leading-relaxed text-zinc-300">
                  Teachers who are already retired and receiving CalSTRS
                  benefits when the divorce is finalized.
                </p>
              </div>
            </div>
            <div>
              <h4 className="mb-5 text-xl font-semibold text-white">
                Key Characteristics:
              </h4>
              <div className="grid gap-6 mb-8 grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr]">
                <div className="p-5 rounded-xl bg-white bg-opacity-10">
                  <h5 className="mb-2 text-lg font-semibold text-white">
                    ✓ Immediate Implementation
                  </h5>
                  <p className="text-sm leading-normal text-zinc-300">
                    Former spouse begins receiving payments immediately upon DRO
                    approval
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white bg-opacity-10">
                  <h5 className="mb-2 text-lg font-semibold text-white">
                    ✓ Fixed Percentage
                  </h5>
                  <p className="text-sm leading-normal text-zinc-300">
                    Division based on a fixed percentage of the current monthly
                    benefit
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white bg-opacity-10">
                  <h5 className="mb-2 text-lg font-semibold text-white">
                    ✓ COLA Adjustments
                  </h5>
                  <p className="text-sm leading-normal text-zinc-300">
                    Former spouse receives proportional cost-of-living increases
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white bg-opacity-10">
                  <h5 className="mb-2 text-lg font-semibold text-white">
                    ✓ Lifetime Payments
                  </h5>
                  <p className="text-sm leading-normal text-zinc-300">
                    Payments continue for the lifetime of the former spouse
                  </p>
                </div>
              </div>
              <div className="p-6 mb-6 rounded-xl border border-solid bg-white bg-opacity-0 border-white border-opacity-10">
                <h5 className="mb-3 text-lg font-semibold text-white">
                  Important Limitations:
                </h5>
                <ul className="pl-5 text-base leading-relaxed text-zinc-300">
                  <li className="mb-2">
                    Cannot create a separate account for the former spouse
                  </li>
                  <li className="mb-2">
                    Former spouse cannot control retirement timing or benefit
                    options
                  </li>
                  <li>
                    Payments end upon death of either the member or former
                    spouse
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-green-400 bg-opacity-10">
                <h5 className="mb-3 text-lg font-semibold text-green-400">
                  Survivor Benefit Options:
                </h5>
                <p className="text-base leading-relaxed text-zinc-300">
                  The DRO can award survivor benefits to the former spouse, but
                  this will reduce the member's monthly allowance. This decision
                  must be made carefully as it affects both parties' financial
                  security.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
