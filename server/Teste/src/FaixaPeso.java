import java.math.BigDecimal;

public enum FaixaPeso
{
	A(1f, 25.5f),
	B(25.501f, 50.5f);

	private Float min;
	private Float max;


	FaixaPeso( Float numValMin, Float numValMax) {
		this.min = numValMin;
		this.max = numValMax;
	}

	public Float getMin() {
		return min;
	}

	public Float getMax() {
		return max;
	}

	@Override
	public String toString() {
		return min.toString() + " - " + max.toString();
	}
}
