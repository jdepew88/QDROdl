import { ModelCard } from "./ModelCard";

export function DROModelsSection() {
  return (
    <section className="mb-24">
      <h2 className="mb-14 text-4xl font-bold leading-tight text-center text-white">
        The Three CalPERS DRO Models
      </h2>
      <div className="grid gap-12 grid-cols-[1fr]">
        <ModelCard
          model="MODEL A"
          title="Separate Account"
          description="Creates a completely separate CalPERS account for the former spouse, allowing independent retirement decisions."
          bestFor="Members who are not yet retired and want to give their former spouse complete control over their portion of the benefits."
          colorScheme="blue"
        >
          <h4 className="mb-5 text-xl font-semibold text-white">
            Key Features:
          </h4>
          <div className="grid gap-6 mb-8 grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr]">
            <div className="p-5 rounded-xl bg-white bg-opacity-10">
              <h5 className="mb-2 text-lg font-semibold text-white">
                ✓ Independent Control
              </h5>
              <p className="text-sm leading-normal text-zinc-300">
                Former spouse controls their own retirement timing and benefit
                options
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white bg-opacity-10">
              <h5 className="mb-2 text-lg font-semibold text-white">
                ✓ Separate Benefits
              </h5>
              <p className="text-sm leading-normal text-zinc-300">
                Creates two distinct CalPERS accounts with separate benefit
                calculations
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white bg-opacity-10">
              <h5 className="mb-2 text-lg font-semibold text-white">
                ✓ Health Benefits
              </h5>
              <p className="text-sm leading-normal text-zinc-300">
                Former spouse may be eligible for CalPERS health benefits upon
                retirement
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white bg-opacity-10">
              <h5 className="mb-2 text-lg font-semibold text-white">
                ✓ Survivor Benefits
              </h5>
              <p className="text-sm leading-normal text-zinc-300">
                Former spouse can designate their own beneficiaries for their
                account
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
                Minimum service credit requirements must be met
              </li>
              <li>
                Former spouse becomes a CalPERS member with all associated
                rights and responsibilities
              </li>
            </ul>
          </div>
        </ModelCard>

        <ModelCard
          model="MODEL B"
          title="Time Rule Order"
          description="Divides the member's retirement benefit based on the ratio of service credit earned during marriage to total service credit."
          bestFor="Cases where the member has significant pre-marital or post-separation service credit, and a proportional division is desired."
          colorScheme="violet"
        >
          <h4 className="mb-5 text-xl font-semibold text-white">
            How It Works:
          </h4>
          <div className="p-8 mb-8 text-center rounded-2xl bg-white bg-opacity-10">
            <h5 className="mb-4 text-xl font-semibold text-white">
              Time Rule Formula
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
                Member decides when to retire; former spouse receives payments
                when member retires
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
        </ModelCard>

        <ModelCard
          model="MODEL C"
          title="In Pay Status"
          description="Used when the CalPERS member is already retired and receiving monthly pension payments at the time of divorce."
          bestFor="Members who are already retired and receiving CalPERS benefits when the divorce is finalized."
          colorScheme="green"
        >
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
                Payments end upon death of either the member or former spouse
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-green-400 bg-opacity-10">
            <h5 className="mb-3 text-lg font-semibold text-green-400">
              Survivor Benefit Options:
            </h5>
            <p className="text-base leading-relaxed text-zinc-300">
              The DRO can award survivor benefits to the former spouse, but this
              will reduce the member's monthly allowance. This decision must be
              made carefully as it affects both parties' financial security.
            </p>
          </div>
        </ModelCard>
      </div>
    </section>
  );
}
